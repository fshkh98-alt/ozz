import { db } from "@/lib/db";

/**
 * Content-aware navigation: a section only appears if it actually has
 * data. Computed server-side with cheap count() queries — never hide
 * with CSS, since that would still ship an empty page to crawlers/users.
 */
export async function getAvailableSections() {
  const [
    projects,
    experience,
    education,
    certifications,
    posts,
    writeups,
    achievements,
    settings,
  ] = await Promise.all([
    db.project.count(),
    db.experience.count(),
    db.education.count(),
    db.certification.count(),
    db.post.count({ where: { status: "PUBLISHED" } }),
    db.writeup.count({ where: { status: "PUBLISHED" } }),
    db.achievement.count(),
    db.siteSettings.findUnique({ where: { id: "singleton" } }),
  ]);

  return {
    projects: projects > 0,
    experience: experience > 0,
    education: education > 0,
    certifications: certifications > 0,
    blog: posts > 0,
    writeups: writeups > 0,
    achievements: achievements > 0,
    resume: Boolean(settings?.cvUrl),
    // about/skills/contact are always shown — they degrade gracefully
    // to an EmptyState rather than needing to be hidden entirely.
  };
}
