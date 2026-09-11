import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { buttonClasses } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = locale === "ar" ? ar : en;
  const project = await db.project.findUnique({ where: { slug } });

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold">{project.title}</h1>
      <p className="text-text-muted">{project.fullDesc ?? project.shortDesc}</p>

      {project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-md bg-surface-2 px-2 py-1 text-xs text-text-muted">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {project.githubUrl && (
          <a href={project.githubUrl} className={buttonClasses("secondary")} target="_blank" rel="noopener noreferrer">
            {t.common.sourceCode}
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} className={buttonClasses("primary")} target="_blank" rel="noopener noreferrer">
            {t.common.liveDemo}
          </a>
        )}
      </div>

      {project.content && (
        <div className="prose prose-invert max-w-none">{project.content}</div>
      )}
    </article>
  );
}
