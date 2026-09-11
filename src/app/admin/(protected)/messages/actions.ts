"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function markMessageRead(id: string, read: boolean) {
  "use server";
  await requireAdmin();
  await db.message.update({ where: { id }, data: { read } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  "use server";
  await requireAdmin();
  await db.message.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
