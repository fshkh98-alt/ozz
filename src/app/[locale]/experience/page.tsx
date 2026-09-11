import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", {
    year: "numeric",
    month: "short",
  }).format(date);
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;
  const items = await db.experience.findMany({ orderBy: { startDate: "desc" } });

  if (items.length === 0) return <EmptyState message={t.common.empty} />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">{t.nav.experience}</h1>
      <div className="space-y-4">
        {items.map((exp) => (
          <Card key={exp.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-medium">
                {exp.position} · {exp.companyUrl ? (
                  <a href={exp.companyUrl} className="text-accent" target="_blank" rel="noopener noreferrer">
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </h2>
              <span className="text-xs text-text-muted">
                {formatDate(exp.startDate, locale)} — {exp.current ? t.common.present : exp.endDate ? formatDate(exp.endDate, locale) : ""}
              </span>
            </div>
            {exp.location && <p className="mt-1 text-xs text-text-muted">{exp.location}</p>}
            {exp.description && <p className="mt-3 text-sm text-text-muted">{exp.description}</p>}
            {exp.technologies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="rounded-md bg-surface-2 px-2 py-1 text-xs text-text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
