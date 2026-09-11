import Link from "next/link";
import { db } from "@/lib/db";
import { buttonClasses } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;

  const [hasProjects, profile, settings] = await Promise.all([
    db.project.count().then((c) => c > 0),
    db.profile.findFirst(),
    db.siteSettings.findUnique({ where: { id: "singleton" } }),
  ]);

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="section-kicker">Ozaib / Portfolio</span>

        <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-7xl">
          <span className="text-gradient">{profile?.displayName ?? t.home.title}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
          {profile?.shortBio ?? t.home.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {hasProjects && (
            <Link href={`/${locale}/projects`} className={buttonClasses("primary")}>
              {t.home.exploreWork}
            </Link>
          )}
          <Link href={`/${locale}/blog`} className={buttonClasses("secondary")}>
            {t.home.readBlog}
          </Link>
          <Link href={`/${locale}/contact`} className={buttonClasses("ghost")}>
            {t.home.contactMe}
          </Link>
          {settings?.cvUrl && (
            <a href={settings.cvUrl} className="px-2 text-sm font-medium text-accent transition hover:text-text">
              {t.common.downloadCv} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-3 text-start sm:grid-cols-3">
          {[
            ["01", locale === "ar" ? "الأمن السيبراني" : "Cybersecurity"],
            ["02", locale === "ar" ? "المشاريع" : "Projects"],
            ["03", locale === "ar" ? "الكتابة التقنية" : "Technical Writing"],
          ].map(([number, label]) => (
            <div key={number} className="surface-card p-4">
              <div className="text-xs font-semibold text-accent">{number}</div>
              <div className="mt-2 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
