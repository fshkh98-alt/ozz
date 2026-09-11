import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getAvailableSections } from "@/lib/nav";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LangSwitcher } from "./LangSwitcher";
import { MobileNav } from "./MobileNav";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

export async function Navbar({ locale }: { locale: Locale }) {
  const t = locale === "ar" ? ar : en;
  const sections = await getAvailableSections();

  const links: { href: string; label: string; show: boolean }[] = [
    { href: "about", label: t.nav.about, show: true },
    { href: "skills", label: t.nav.skills, show: true },
    { href: "projects", label: t.nav.projects, show: sections.projects },
    { href: "experience", label: t.nav.experience, show: sections.experience },
    { href: "education", label: t.nav.education, show: sections.education },
    { href: "certifications", label: t.nav.certifications, show: sections.certifications },
    { href: "blog", label: t.nav.blog, show: sections.blog },
    { href: "writeups", label: t.nav.writeups, show: sections.writeups },
    { href: "achievements", label: t.nav.achievements, show: sections.achievements },
    { href: "resume", label: t.common.downloadCv, show: sections.resume },
    { href: "contact", label: t.nav.contact, show: true },
  ];

  return (
    <header className="site-header">
      <nav className="site-container relative flex items-center justify-between py-3.5">
        <Link href={`/${locale}`} className="brand-mark text-lg">
          <span className="brand-dot" aria-hidden="true" />
          Ozaib<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-border bg-surface/60 p-1 text-sm md:flex">
          {links
            .filter((l) => l.show)
            .map((l) => (
              <li key={l.href}>
                <Link
                  href={`/${locale}/${l.href}`}
                  className="rounded-full px-3 py-2 text-text-muted transition-all hover:bg-surface-2 hover:text-text"
                >
                  {l.label}
                </Link>
              </li>
            ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitcher current={locale} />
          <ThemeSwitcher />
          <MobileNav
            links={links
              .filter((l) => l.show)
              .map((l) => ({ href: `/${locale}/${l.href}`, label: l.label }))}
          />
        </div>
      </nav>
    </header>
  );
}
