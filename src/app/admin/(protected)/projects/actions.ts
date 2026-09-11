"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  title: z.string().min(1).max(160),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens only"),
  shortDesc: z.string().min(1).max(300),
  fullDesc: z.string().max(2000).optional().or(z.literal("")),
  content: z.string().max(20000).optional().or(z.literal("")),
  technologies: z.string().optional().default(""),
  category: z.string().max(80).optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  demoUrl: z.string().url().optional().or(z.literal("")),
  images: z.string().optional().default(""),
  featured: z.coerce.boolean().optional(),
  status: z.enum(["IDEA", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

function parseOptionalDate(value: string | undefined, field: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ${field}`);
  }
  return date;
}

function toData(raw: z.infer<typeof schema>) {
  return {
    title: raw.title,
    slug: raw.slug,
    shortDesc: raw.shortDesc,
    fullDesc: raw.fullDesc || null,
    content: raw.content || null,
    technologies: raw.technologies ? raw.technologies.split(",").map((t) => t.trim()).filter(Boolean) : [],
    category: raw.category || null,
    githubUrl: raw.githubUrl || null,
    demoUrl: raw.demoUrl || null,
    images: raw.images ? raw.images.split(",").map((t) => t.trim()).filter(Boolean) : [],
    featured: Boolean(raw.featured),
    status: raw.status,
    startDate: parseOptionalDate(raw.startDate, "start date"),
    endDate: parseOptionalDate(raw.endDate, "end date"),
  };
}

function revalidateAll(slug?: string) {
  revalidatePath("/admin/projects");
  revalidatePath("/ar/projects");
  revalidatePath("/en/projects");
  if (slug) {
    revalidatePath(`/ar/projects/${slug}`);
    revalidatePath(`/en/projects/${slug}`);
  }
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.project.create({ data: toData(raw) });
  revalidateAll(raw.slug);
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.project.update({ where: { id }, data: toData(raw) });
  revalidateAll(raw.slug);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  "use server";
  await requireAdmin();
  await db.project.delete({ where: { id } });
  revalidateAll();
}
