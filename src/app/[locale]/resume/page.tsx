import { db } from "@/lib/db";
import { buttonClasses } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;
  const settings = await db.siteSettings.findUnique({ where: { id: "singleton" } });

  return (
    <div className="mx-auto max-w-lg space-y-6 text-center">
      <h1 className="text-3xl font-semibold">{t.resume.title}</h1>
      {settings?.cvUrl ? (
        <a href={settings.cvUrl} className={buttonClasses("primary")} target="_blank" rel="noopener noreferrer">
          {t.common.downloadCv}
        </a>
      ) : (
        <EmptyState message={t.resume.unavailable} />
      )}
    </div>
  );
}
