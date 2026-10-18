import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";
import { dictionaries } from "@/content/i18n";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { RequestProvider } from "@/components/providers/RequestProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/ui/RevealObserver";

const es = dictionaries.es;

export const metadata: Metadata = {
  title: es.meta.title,
  description: es.meta.description,
  robots: { index: false, follow: false },
  openGraph: { title: es.meta.title, description: es.meta.description, type: "website", locale: "es_MX" },
};

export const viewport: Viewport = {
  themeColor: "#0e0c0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <LanguageProvider>
          <RequestProvider>
            <SiteHeader />
            <main id="contenido" tabIndex={-1} className="focus:outline-none">
              {children}
            </main>
            <SiteFooter />
            <RevealObserver />
          </RequestProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
