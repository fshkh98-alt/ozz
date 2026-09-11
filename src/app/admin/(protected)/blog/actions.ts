"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify, estimateReadingTime } from "@/lib/utils";
import { sanitizeContent } from "@/lib/sanitize";

const schema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(400).optional().or(z.literal("")),
  content: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal("")),
  categoryName: z.string().max(80).optional().or(z.literal("")),
  tags: z.string().optional().default(""),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED"]),
  featured: z.coerce.boolean().optional(),
  seoTitle: z.string().max(160).optional().or(z.literal("")),
  seoDescription: z.string().max(300).optional().or(z.literal("")),
  canonicalUrl: z.string().url().optional().or(z.literal("")),
});

async function resolveCategory(name: string) {
  if (!name) return undefined;
  const slug = slugify(name);
  const category = await db.category.upsert({
    where: { slug },
    update: {},
    create: { name, slug },
  });
  return category.id;
}

async function resolveTags(raw: string) {
  const names = raw.split(",").map((t) => t.trim()).filter(Boolean);
  const tags = await Promise.all(
    names.map((name) =>
      db.tag.upsert({
        where: { slug: slugify(name) },
        update: {},
        create: { name, slug: slugify(name) },
      })
    )
  );
  return tags.map((t) => ({ id: t.id }));
}

function revalidateAll(slug?: string) {
  revalidatePath("/admin/blog");
  revalidatePath("/ar/blog");
  revalidatePath("/en/blog");
  if (slug) {
    revalidatePath(`/ar/blog/${slug}`);
    revalidatePath(`/en/blog/${slug}`);
  }
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  const categoryId = await resolveCategory(raw.categoryName ?? "");
  const tagConnections = await resolveTags(raw.tags);
  const safeContent = sanitizeContent(raw.content);

  await db.post.create({
    data: {
      title: raw.title,
      slug: raw.slug,
      excerpt: raw.excerpt || null,
      content: safeContent,
      coverImage: raw.coverImage || null,
      categoryId: categoryId ?? null,
      tags: { connect: tagConnections },
      status: raw.status,
      featured: Boolean(raw.featured),
      publishedAt: raw.status === "PUBLISHED" ? new Date() : null,
      readingTime: estimateReadingTime(safeContent),
      seoTitle: raw.seoTitle || null,
      seoDescription: raw.seoDescription || null,
      canonicalUrl: raw.canonicalUrl || null,
    },
  });
  revalidateAll(raw.slug);
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  const categoryId = await resolveCategory(raw.categoryName ?? "");
  const tagConnections = await resolveTags(raw.tags);
  const existing = await db.post.findUnique({ where: { id }, select: { publishedAt: true } });
  const safeContent = sanitizeContent(raw.content);

  await db.post.update({
    where: { id },
    data: {
      title: raw.title,
      slug: raw.slug,
      excerpt: raw.excerpt || null,
      content: safeContent,
      coverImage: raw.coverImage || null,
      categoryId: categoryId ?? null,
      tags: { set: tagConnections },
      status: raw.status,
      featured: Boolean(raw.featured),
      publishedAt: raw.status === "PUBLISHED" ? existing?.publishedAt ?? new Date() : null,
      readingTime: estimateReadingTime(safeContent),
      seoTitle: raw.seoTitle || null,
      seoDescription: raw.seoDescription || null,
      canonicalUrl: raw.canonicalUrl || null,
    },
  });
  revalidateAll(raw.slug);
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  "use server";
  await requireAdmin();
  await db.post.delete({ where: { id } });
  revalidateAll();
}
