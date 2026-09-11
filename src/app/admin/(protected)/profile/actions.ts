"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  displayName: z.string().min(1).max(80),
  title: z.string().min(1).max(120),
  shortBio: z.string().max(500).optional().or(z.literal("")),
  longBio: z.string().max(5000).optional().or(z.literal("")),
  currentFocus: z.string().max(500).optional().or(z.literal("")),
  interests: z.string().max(500).optional().or(z.literal("")),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

export async function updateProfile(formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  const existing = await db.profile.findFirst();

  const data = {
    displayName: raw.displayName,
    title: raw.title,
    shortBio: raw.shortBio || null,
    longBio: raw.longBio || null,
    currentFocus: raw.currentFocus || null,
    interests: raw.interests || null,
    avatarUrl: raw.avatarUrl || null,
  };

  if (existing) {
    await db.profile.update({ where: { id: existing.id }, data });
  } else {
    await db.profile.create({ data });
  }

  revalidatePath("/admin/profile");
  revalidatePath("/ar", "layout");
  revalidatePath("/en", "layout");
}
