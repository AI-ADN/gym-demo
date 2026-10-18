import type { ImageAsset } from "@/content/site";

interface PictureProps {
  image: ImageAsset;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}

export function imageSrcSet(image: ImageAsset): string {
  return image.widths.map((w) => `/media/opt/${image.base}-${w}.webp ${w}w`).join(", ");
}

export function imageSrc(image: ImageAsset, width?: number): string {
  const w = width ?? image.widths[image.widths.length - 1];
  return `/media/opt/${image.base}-${w}.webp`;
}

export function Picture({ image, alt, sizes, className, priority, style }: PictureProps) {
  return (
    <img
      src={imageSrc(image)}
      srcSet={imageSrcSet(image)}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
