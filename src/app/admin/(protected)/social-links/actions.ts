"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  platform: z.string().min(1).max(60),
  url: z.string().url(),
  label: z.string().max(80).optional().or(z.literal("")),
  icon: z.string().max(80).optional().or(z.literal("")),
  visible: z.coerce.boolean().optional(),
  order: z.coerce.number().int().default(0),
});

function toData(raw: z.infer<typeof schema>) {
  return {
    platform: raw.platform,
    url: raw.url,
    label: raw.label || null,
    icon: raw.icon || null,
    visible: Boolean(raw.visible),
    order: raw.order,
  };
}

function revalidateAll() {
  revalidatePath("/admin/social-links");
  revalidatePath("/ar", "layout");
  revalidatePath("/en", "layout");
}

export async function createSocialLink(formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.socialLink.create({ data: toData(raw) });
  revalidateAll();
  redirect("/admin/social-links");
}

export async function updateSocialLink(id: string, formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.socialLink.update({ where: { id }, data: toData(raw) });
  revalidateAll();
  redirect("/admin/social-links");
}

export async function deleteSocialLink(id: string) {
  "use server";
  await requireAdmin();
  await db.socialLink.delete({ where: { id } });
  revalidateAll();
}
