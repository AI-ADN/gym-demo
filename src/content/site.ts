/**
 * Language-independent data for the PULSO demo.
 * All prices, people, schedules and contact data are fictitious (see CLIENT.md).
 * Texts per language live in ./i18n.ts and are keyed by the ids below.
 */

export type HeroVariant = "video" | "photo";
export type PlanId = "esencial" | "activo" | "integral";
export type ClassId = "fuerza-base" | "funcional" | "movilidad" | "cycling";
export type SpaceId = "fuerza" | "cardio" | "funcional" | "estudio" | "vestidores" | "recepcion";
export type EquipmentId = "guiada" | "libre" | "cardio" | "funcional";
export type TeamId = "valeria" | "diego" | "renata" | "mateo";
export type SectionId =
  | "nosotros"
  | "equipamiento"
  | "instalaciones"
  | "equipo"
  | "clases"
  | "paquetes"
  | "ubicaciones"
  | "preguntas"
  | "contacto";

/** Weekday index: 1 = Monday … 7 = Sunday. */
export type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ImageAsset {
  /** Base name of the optimized files in /public/media/opt (`<base>-<width>.webp`). */
  base: string;
  /** Original file, used as fallback. */
  original: string;
  width: number;
  height: number;
  widths: number[];
}

const photo = (name: string, height = 1493): ImageAsset => ({
  base: `photos-${name}`,
  original: `/media/photos/${name}.jpg`,
  width: 2000,
  height,
  widths: [640, 1080, 1600],
});

const portrait = (name: string): ImageAsset => ({
  base: `team-${name}`,
  original: `/media/team/${name}.jpg`,
  width: 1360,
  height: 2048,
  widths: [640, 1080],
});

export const site = {
  name: "PULSO",
  descriptor: "ATHLETIC CLUB",
  city: "Monterrey, Nuevo León",

  hero: {
    /** Default cover variant. Review either with `?portada=video` or `?portada=foto`. */
    variant: "video" as HeroVariant,
    video: {
      webm: "/media/hero/loop-720.webm",
      mp4: "/media/hero/loop-720.mp4",
      poster: "/media/hero/poster.jpg",
    },
    photo: photo("fuerza", 1131),
  },

  aboutImage: photo("coaching", 1131),

  equipment: [
    { id: "guiada", image: photo("eq-machines") },
    { id: "libre", image: photo("eq-free-weights") },
    { id: "cardio", image: photo("eq-cardio") },
    { id: "funcional", image: photo("eq-functional") },
  ] satisfies { id: EquipmentId; image: ImageAsset }[],

  spaces: [
    { id: "fuerza", image: photo("fuerza", 1131) },
    { id: "cardio", image: photo("cardio") },
    { id: "funcional", image: photo("funcional") },
    { id: "estudio", image: photo("estudio", 1131) },
    { id: "vestidores", image: photo("vestidores") },
    { id: "recepcion", image: photo("recepcion") },
  ] satisfies { id: SpaceId; image: ImageAsset }[],

  team: [
    { id: "valeria", name: "Valeria Montes", image: portrait("valeria") },
    { id: "diego", name: "Diego Salas", image: portrait("diego") },
    { id: "renata", name: "Renata Cruz", image: portrait("renata") },
    { id: "mateo", name: "Mateo Ríos", image: portrait("mateo") },
  ] satisfies { id: TeamId; name: string; image: ImageAsset }[],

  classes: [
    { id: "fuerza-base", minutes: 45, slots: [{ day: 1, time: "18:00" }, { day: 3, time: "18:00" }] },
    {
      id: "funcional",
      minutes: 45,
      slots: [
        { day: 2, time: "07:00" },
        { day: 2, time: "19:00" },
        { day: 4, time: "07:00" },
        { day: 4, time: "19:00" },
      ],
    },
    {
      id: "movilidad",
      minutes: 30,
      slots: [{ day: 1, time: "08:00" }, { day: 3, time: "08:00" }, { day: 5, time: "08:00" }],
    },
    { id: "cycling", minutes: 45, slots: [{ day: 2, time: "18:00" }, { day: 4, time: "18:00" }] },
  ] satisfies { id: ClassId; minutes: number; slots: { day: Weekday; time: string }[] }[],

  plans: [
    { id: "esencial", price: 699 },
    { id: "activo", price: 999 },
    { id: "integral", price: 1799 },
  ] satisfies { id: PlanId; price: number }[],
  currency: "MXN",

  /** Plan comparison matrix. `true` = included, `false` = not included, string key = custom value. */
  comparison: [
    { id: "areas", values: [true, true, true] },
    { id: "lockers", values: [true, true, true] },
    { id: "orientation", values: [true, true, true] },
    { id: "classes", values: [false, true, true] },
    { id: "review", values: [false, true, true] },
    { id: "personal", values: [false, false, "personalValue"] },
  ] as const,

  hours: {
    gym: [
      { days: "weekdays", open: "06:00", close: "23:00" },
      { days: "saturday", open: "07:00", close: "18:00" },
      { days: "sunday", open: "08:00", close: "14:00" },
    ],
    reception: [
      { days: "weekdays", open: "08:00", close: "20:00" },
      { days: "saturday", open: "09:00", close: "14:00" },
    ],
  } as const,

  /** Sample channels: NOT operational. Never render them as mailto:/tel:/wa.me links. */
  contact: {
    email: "hola@pulso.example",
    phone: "+52 81 0000 0000",
  },

  sections: [
    "nosotros",
    "equipamiento",
    "instalaciones",
    "equipo",
    "clases",
    "paquetes",
    "ubicaciones",
    "preguntas",
    "contacto",
  ] satisfies SectionId[],
} as const;

export function formatPrice(amount: number, locale: "es" | "en"): string {
  return new Intl.NumberFormat(locale === "es" ? "es-MX" : "en-US", {
    style: "currency",
    currency: "MXN",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(amount);
}
