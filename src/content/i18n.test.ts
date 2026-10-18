import { describe, expect, it } from "vitest";
import { dictionaries } from "./i18n";
import { site } from "./site";

type Shape = string | number | boolean | null | Shape[] | { [key: string]: Shape };

function shape(value: unknown): Shape {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return typeof value;
}

describe("translations", () => {
  it("have the same structure and list lengths in ES and EN", () => {
    expect(shape(dictionaries.en)).toEqual(shape(dictionaries.es));
  });

  it("have no empty strings except optional plan tags", () => {
    for (const [locale, dict] of Object.entries(dictionaries)) {
      const walk = (value: unknown, path: string) => {
        if (typeof value === "string") {
          if (!path.endsWith(".tag")) expect(value.trim(), `${locale}${path}`).not.toBe("");
        } else if (value && typeof value === "object") {
          for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`);
        }
      };
      walk(dict, "");
    }
  });

  it("cover every configured plan, class, space, team member and section", () => {
    for (const dict of Object.values(dictionaries)) {
      for (const p of site.plans) expect(dict.plans.items[p.id]).toBeDefined();
      for (const c of site.classes) expect(dict.classes.items[c.id]).toBeDefined();
      for (const s of site.spaces) expect(dict.spaces.items[s.id]).toBeDefined();
      for (const m of site.team) expect(dict.team.members[m.id]).toBeDefined();
      for (const e of site.equipment) expect(dict.equipment.items[e.id]).toBeDefined();
      for (const id of site.sections) expect(dict.nav.sections[id]).toBeDefined();
    }
  });
});
