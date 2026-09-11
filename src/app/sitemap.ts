import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { locales } from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXTAUTH_URL ?? "https://example.com";
  const staticPaths = ["", "about", "skills", "contact"];

  const [projects, posts, writeups] = await Promise.all([
    db.project.findMany({ select: { slug: true, updatedAt: true } }),
    db.post.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    db.writeup.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
  ]);

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({ url: `${base}/${locale}/${path}`.replace(/\/$/, "") });
    }
    for (const p of projects) {
      entries.push({ url: `${base}/${locale}/projects/${p.slug}`, lastModified: p.updatedAt });
    }
    for (const p of posts) {
      entries.push({ url: `${base}/${locale}/blog/${p.slug}`, lastModified: p.updatedAt });
    }
    for (const w of writeups) {
      entries.push({ url: `${base}/${locale}/writeups/${w.slug}`, lastModified: w.updatedAt });
    }
  }
  return entries;
}
