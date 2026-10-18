// Generates responsive WebP variants for every JPG in public/media into public/media/opt.
// Run after replacing photos: `pnpm images`.
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/media");
const OUT = path.join(ROOT, "opt");
const WIDTHS = [640, 1080, 1600];
const SOURCE_DIRS = ["photos", "team", "hero"];

async function isFresh(src, dest) {
  try {
    const [s, d] = await Promise.all([stat(src), stat(dest)]);
    return d.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

await mkdir(OUT, { recursive: true });

for (const dir of SOURCE_DIRS) {
  const files = (await readdir(path.join(ROOT, dir))).filter((f) => /\.jpe?g$/i.test(f));
  for (const file of files) {
    const src = path.join(ROOT, dir, file);
    const base = `${dir}-${file.replace(/\.jpe?g$/i, "")}`;
    const meta = await sharp(src).metadata();
    for (const width of WIDTHS) {
      if (meta.width && width > meta.width) continue;
      const dest = path.join(OUT, `${base}-${width}.webp`);
      if (await isFresh(src, dest)) continue;
      await sharp(src).resize({ width }).webp({ quality: 72 }).toFile(dest);
      console.log("wrote", path.relative(ROOT, dest));
    }
  }
}
