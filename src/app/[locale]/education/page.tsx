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

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;
  const items = await db.education.findMany({ orderBy: { startDate: "desc" } });

  if (items.length === 0) return <EmptyState message={t.common.empty} />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">{t.nav.education}</h1>
      <div className="space-y-4">
        {items.map((edu) => (
          <Card key={edu.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-medium">
                {edu.degree}{edu.field ? ` · ${edu.field}` : ""}
              </h2>
              <span className="text-xs text-text-muted">
                {formatDate(edu.startDate, locale)} — {edu.current ? t.common.present : edu.endDate ? formatDate(edu.endDate, locale) : ""}
              </span>
            </div>
            <p className="mt-1 text-sm text-text-muted">
              {edu.link ? (
                <a href={edu.link} className="text-accent" target="_blank" rel="noopener noreferrer">
                  {edu.institution}
                </a>
              ) : (
                edu.institution
              )}
              {edu.location ? ` · ${edu.location}` : ""}
            </p>
            {edu.description && <p className="mt-3 text-sm text-text-muted">{edu.description}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
}
