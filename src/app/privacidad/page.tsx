import type { Metadata } from "next";
import { dictionaries } from "@/content/i18n";
import { PrivacyContent } from "@/components/pages/PrivacyContent";

export const metadata: Metadata = {
  title: `${dictionaries.es.privacy.title} — PULSO Athletic Club`,
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
