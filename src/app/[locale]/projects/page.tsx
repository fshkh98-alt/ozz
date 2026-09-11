import Link from "next/link";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;

  const projects = await db.project.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  if (projects.length === 0) return <EmptyState message={t.common.empty} />;

  return (
    <div className="space-y-8">
      <div>
        <span className="section-kicker">Ozaib / Work</span>
        <h1 className="section-title">{t.nav.projects}</h1>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <Link key={project.id} href={`/${locale}/projects/${project.slug}`}>
            <Card>
              {project.featured && (
                <span className="mb-2 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                  ★
                </span>
              )}
              <h2 className="text-lg font-medium">{project.title}</h2>
              <p className="mt-2 text-sm text-text-muted">{project.shortDesc}</p>
              {project.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-surface-2 px-2 py-1 text-xs text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-3 text-xs uppercase tracking-wide text-text-muted">
                {project.status.replace("_", " ")}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
