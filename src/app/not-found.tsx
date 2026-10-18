import type { Metadata } from "next";
import { dictionaries } from "@/content/i18n";
import { NotFoundContent } from "@/components/pages/NotFoundContent";

export const metadata: Metadata = {
  title: `${dictionaries.es.notFound.title} — PULSO Athletic Club`,
};

export default function NotFound() {
  return <NotFoundContent />;
}
