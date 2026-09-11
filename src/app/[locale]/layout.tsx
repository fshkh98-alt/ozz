import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLocale, localeDirection, type Locale } from "@/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";
import "highlight.js/styles/github-dark.css";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  return (
    <html lang={typedLocale} dir={localeDirection[typedLocale]}>
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        <Navbar locale={typedLocale} />
        <main className="site-container py-10 sm:py-14">{children}</main>
        <Footer locale={typedLocale} />
      </body>
    </html>
  );
}
