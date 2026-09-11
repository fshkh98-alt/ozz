"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  company: z.string().min(1).max(120),
  companyUrl: z.string().url().optional().or(z.literal("")),
  position: z.string().min(1).max(120),
  description: z.string().max(2000).optional().or(z.literal("")),
  technologies: z.string().optional().default(""),
  location: z.string().max(120).optional().or(z.literal("")),
  startDate: z.coerce.date(),
  endDate: z.string().optional(),
  current: z.coerce.boolean().optional(),
});

function toData(raw: z.infer<typeof schema>) {
  return {
    company: raw.company,
    companyUrl: raw.companyUrl || null,
    position: raw.position,
    description: raw.description || null,
    technologies: raw.technologies
      ? raw.technologies.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    location: raw.location || null,
    startDate: raw.startDate,
    endDate: raw.current ? null : raw.endDate ? new Date(raw.endDate) : null,
    current: Boolean(raw.current),
  };
}

function revalidateAll() {
  revalidatePath("/admin/experience");
  revalidatePath("/ar/experience");
  revalidatePath("/en/experience");
}

export async function createExperience(formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.experience.create({ data: toData(raw) });
  revalidateAll();
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.experience.update({ where: { id }, data: toData(raw) });
  revalidateAll();
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  "use server";
  await requireAdmin();
  await db.experience.delete({ where: { id } });
  revalidateAll();
}
