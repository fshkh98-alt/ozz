"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  institution: z.string().min(1).max(160),
  degree: z.string().min(1).max(160),
  field: z.string().max(160).optional().or(z.literal("")),
  description: z.string().max(2000).optional().or(z.literal("")),
  logoUrl: z.string().url().optional().or(z.literal("")),
  link: z.string().url().optional().or(z.literal("")),
  location: z.string().max(120).optional().or(z.literal("")),
  startDate: z.coerce.date(),
  endDate: z.string().optional(),
  current: z.coerce.boolean().optional(),
});

function toData(raw: z.infer<typeof schema>) {
  return {
    institution: raw.institution,
    degree: raw.degree,
    field: raw.field || null,
    description: raw.description || null,
    logoUrl: raw.logoUrl || null,
    link: raw.link || null,
    location: raw.location || null,
    startDate: raw.startDate,
    endDate: raw.current ? null : raw.endDate ? new Date(raw.endDate) : null,
    current: Boolean(raw.current),
  };
}

function revalidateAll() {
  revalidatePath("/admin/education");
  revalidatePath("/ar/education");
  revalidatePath("/en/education");
}

export async function createEducation(formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.education.create({ data: toData(raw) });
  revalidateAll();
  redirect("/admin/education");
}

export async function updateEducation(id: string, formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.education.update({ where: { id }, data: toData(raw) });
  revalidateAll();
  redirect("/admin/education");
}

export async function deleteEducation(id: string) {
  "use server";
  await requireAdmin();
  await db.education.delete({ where: { id } });
  revalidateAll();
}
