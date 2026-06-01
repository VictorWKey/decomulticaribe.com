import "@fontsource-variable/outfit/index.css";
import "@fontsource-variable/newsreader/index.css";
import "../globals.css";

import type { ReactNode } from "react";

import { isLocale } from "@/lib/site-content";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : "es";

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}