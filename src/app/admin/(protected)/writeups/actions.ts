"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { sanitizeContent } from "@/lib/sanitize";

const schema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(400).optional().or(z.literal("")),
  content: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal("")),
  type: z.enum(["CTF", "LAB", "RESEARCH", "NOTES", "TOOL_EXPERIMENT", "VULN_ANALYSIS"]),
  tags: z.string().optional().default(""),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED"]),
});

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
  revalidatePath("/admin/writeups");
  revalidatePath("/ar/writeups");
  revalidatePath("/en/writeups");
  if (slug) {
    revalidatePath(`/ar/writeups/${slug}`);
    revalidatePath(`/en/writeups/${slug}`);
  }
}

export async function createWriteup(formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  const tagConnections = await resolveTags(raw.tags);
  const safeContent = sanitizeContent(raw.content);

  await db.writeup.create({
    data: {
      title: raw.title,
      slug: raw.slug,
      excerpt: raw.excerpt || null,
      content: safeContent,
      coverImage: raw.coverImage || null,
      type: raw.type,
      tags: { connect: tagConnections },
      status: raw.status,
      publishedAt: raw.status === "PUBLISHED" ? new Date() : null,
    },
  });
  revalidateAll(raw.slug);
  redirect("/admin/writeups");
}

export async function updateWriteup(id: string, formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  const tagConnections = await resolveTags(raw.tags);
  const existing = await db.writeup.findUnique({ where: { id }, select: { publishedAt: true } });
  const safeContent = sanitizeContent(raw.content);

  await db.writeup.update({
    where: { id },
    data: {
      title: raw.title,
      slug: raw.slug,
      excerpt: raw.excerpt || null,
      content: safeContent,
      coverImage: raw.coverImage || null,
      type: raw.type,
      tags: { set: tagConnections },
      status: raw.status,
      publishedAt: raw.status === "PUBLISHED" ? existing?.publishedAt ?? new Date() : null,
    },
  });
  revalidateAll(raw.slug);
  redirect("/admin/writeups");
}

export async function deleteWriteup(id: string) {
  "use server";
  await requireAdmin();
  await db.writeup.delete({ where: { id } });
  revalidateAll();
}
