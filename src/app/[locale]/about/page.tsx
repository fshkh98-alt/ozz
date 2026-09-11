import { db } from "@/lib/db";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;
  const profile = await db.profile.findFirst();

  if (!profile?.longBio && !profile?.shortBio) {
    return <EmptyState message={t.common.empty} />;
  }

  return (
    <article className="prose prose-invert mx-auto max-w-2xl">
      <h1>{t.nav.about}</h1>
      {profile.longBio ? <p>{profile.longBio}</p> : <p>{profile.shortBio}</p>}
      {profile.currentFocus && (
        <>
          <h2>{locale === "ar" ? "التركيز الحالي" : "Current Focus"}</h2>
          <p>{profile.currentFocus}</p>
        </>
      )}
    </article>
  );
}
