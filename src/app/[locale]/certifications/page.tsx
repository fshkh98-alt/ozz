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

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;
  const items = await db.certification.findMany({ orderBy: { issueDate: "desc" } });

  if (items.length === 0) return <EmptyState message={t.common.empty} />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">{t.nav.certifications}</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((cert) => (
          <Card key={cert.id}>
            <h2 className="text-lg font-medium">{cert.name}</h2>
            <p className="mt-1 text-sm text-text-muted">{cert.issuer}</p>
            <p className="mt-1 text-xs text-text-muted">{formatDate(cert.issueDate, locale)}</p>
            {cert.showCredentialId && cert.credentialId && (
              <p className="mt-2 text-xs text-text-muted">ID: {cert.credentialId}</p>
            )}
            {cert.credentialUrl && (
              <a href={cert.credentialUrl} className="mt-2 inline-block text-xs text-accent" target="_blank" rel="noopener noreferrer">
                {locale === "ar" ? "التحقق من الشهادة" : "Verify credential"}
              </a>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
