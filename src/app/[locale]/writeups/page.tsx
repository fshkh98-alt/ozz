import Link from "next/link";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

export default async function WriteupsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;

  const writeups = await db.writeup.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    include: { tags: true },
  });

  if (writeups.length === 0) return <EmptyState message={t.common.empty} />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">{t.nav.writeups}</h1>
      <div className="grid gap-5 sm:grid-cols-2">
        {writeups.map((writeup) => (
          <Link key={writeup.id} href={`/${locale}/writeups/${writeup.slug}`}>
            <Card>
              <span className="text-xs uppercase tracking-wide text-accent">
                {writeup.type.replace("_", " ")}
              </span>
              <h2 className="mt-2 text-lg font-medium">{writeup.title}</h2>
              {writeup.excerpt && (
                <p className="mt-2 text-sm text-text-muted">{writeup.excerpt}</p>
              )}
              {writeup.publishedAt && (
                <p className="mt-4 text-xs text-text-muted">
                  {new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(writeup.publishedAt)}
                </p>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
