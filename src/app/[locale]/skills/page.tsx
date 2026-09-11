import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;
  const skills = await db.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });

  if (skills.length === 0) return <EmptyState message={t.common.empty} />;

  const grouped = new Map<string, typeof skills>();
  for (const skill of skills) {
    const list = grouped.get(skill.category) ?? [];
    list.push(skill);
    grouped.set(skill.category, list);
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-semibold">{t.nav.skills}</h1>
      {Array.from(grouped.entries()).map(([category, items]) => (
        <div key={category}>
          <h2 className="mb-4 text-sm uppercase tracking-wide text-text-muted">
            {category}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((skill) => (
              <Card key={skill.id} className="py-4 text-center">
                <p className="font-medium">{skill.name}</p>
                <p className="mt-1 text-xs text-text-muted">{skill.level}</p>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
