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
    day: "numeric",
  }).format(date);
}

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;
  const items = await db.achievement.findMany({ orderBy: { date: "desc" } });

  if (items.length === 0) return <EmptyState message={t.common.empty} />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">{t.nav.achievements}</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((a) => (
          <Card key={a.id}>
            <h2 className="text-lg font-medium">{a.title}</h2>
            <p className="mt-1 text-xs text-text-muted">{formatDate(a.date, locale)}</p>
            {a.description && <p className="mt-2 text-sm text-text-muted">{a.description}</p>}
            {a.url && (
              <a href={a.url} className="mt-2 inline-block text-xs text-accent" target="_blank" rel="noopener noreferrer">
                {locale === "ar" ? "التفاصيل" : "Details"}
              </a>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
