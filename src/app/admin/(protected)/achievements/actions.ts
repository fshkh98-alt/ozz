"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  title: z.string().min(1).max(160),
  description: z.string().max(2000).optional().or(z.literal("")),
  date: z.coerce.date(),
  category: z.string().max(80).optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  url: z.string().url().optional().or(z.literal("")),
});

function toData(raw: z.infer<typeof schema>) {
  return {
    title: raw.title,
    description: raw.description || null,
    date: raw.date,
    category: raw.category || null,
    imageUrl: raw.imageUrl || null,
    url: raw.url || null,
  };
}

function revalidateAll() {
  revalidatePath("/admin/achievements");
  revalidatePath("/ar/achievements");
  revalidatePath("/en/achievements");
}

export async function createAchievement(formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.achievement.create({ data: toData(raw) });
  revalidateAll();
  redirect("/admin/achievements");
}

export async function updateAchievement(id: string, formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.achievement.update({ where: { id }, data: toData(raw) });
  revalidateAll();
  redirect("/admin/achievements");
}

export async function deleteAchievement(id: string) {
  "use server";
  await requireAdmin();
  await db.achievement.delete({ where: { id } });
  revalidateAll();
}
