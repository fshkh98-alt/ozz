"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(1).max(160),
  issuer: z.string().min(1).max(160),
  issueDate: z.coerce.date(),
  expirationDate: z.string().optional(),
  credentialId: z.string().max(160).optional().or(z.literal("")),
  showCredentialId: z.coerce.boolean().optional(),
  credentialUrl: z.string().url().optional().or(z.literal("")),
  fileUrl: z.string().url().optional().or(z.literal("")),
  description: z.string().max(2000).optional().or(z.literal("")),
});

function toData(raw: z.infer<typeof schema>) {
  return {
    name: raw.name,
    issuer: raw.issuer,
    issueDate: raw.issueDate,
    expirationDate: raw.expirationDate ? new Date(raw.expirationDate) : null,
    credentialId: raw.credentialId || null,
    showCredentialId: Boolean(raw.showCredentialId),
    credentialUrl: raw.credentialUrl || null,
    fileUrl: raw.fileUrl || null,
    description: raw.description || null,
  };
}

function revalidateAll() {
  revalidatePath("/admin/certifications");
  revalidatePath("/ar/certifications");
  revalidatePath("/en/certifications");
}

export async function createCertification(formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.certification.create({ data: toData(raw) });
  revalidateAll();
  redirect("/admin/certifications");
}

export async function updateCertification(id: string, formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));
  await db.certification.update({ where: { id }, data: toData(raw) });
  revalidateAll();
  redirect("/admin/certifications");
}

export async function deleteCertification(id: string) {
  "use server";
  await requireAdmin();
  await db.certification.delete({ where: { id } });
  revalidateAll();
}
