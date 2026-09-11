"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const skillSchema = z.object({
  name: z.string().min(1).max(80),
  category: z.enum(["PROGRAMMING", "CYBERSECURITY", "NETWORKING", "OS", "TOOLS", "OTHER"]),
  level: z.enum(["EXPLORING", "LEARNING", "FAMILIAR", "INTERMEDIATE", "ADVANCED"]),
  order: z.coerce.number().int().default(0),
});

export async function createSkill(formData: FormData) {
  await requireAdmin();
  const data = skillSchema.parse(Object.fromEntries(formData));
  await db.skill.create({ data });
  revalidatePath("/admin/skills");
  revalidatePath("/ar/skills");
  revalidatePath("/en/skills");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  await requireAdmin();
  const data = skillSchema.parse(Object.fromEntries(formData));
  await db.skill.update({ where: { id }, data });
  revalidatePath("/admin/skills");
  revalidatePath("/ar/skills");
  revalidatePath("/en/skills");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  "use server";
  await requireAdmin();
  await db.skill.delete({ where: { id } });
  revalidatePath("/admin/skills");
  revalidatePath("/ar/skills");
  revalidatePath("/en/skills");
}
