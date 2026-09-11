"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  siteName: z.string().min(1).max(80),
  siteDescription: z.string().max(300).optional().or(z.literal("")),
  logoUrl: z.string().url().optional().or(z.literal("")),
  faviconUrl: z.string().url().optional().or(z.literal("")),
  accentColor: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
  defaultLanguage: z.enum(["ar", "en"]),
  maintenanceMode: z.coerce.boolean().optional(),
  footerText: z.string().max(300).optional().or(z.literal("")),
  cvUrl: z.string().url().optional().or(z.literal("")),
  analyticsEnabled: z.coerce.boolean().optional(),
});

export async function updateSettings(formData: FormData) {
  await requireAdmin();
  const raw = schema.parse(Object.fromEntries(formData));

  await db.siteSettings.upsert({
    where: { id: "singleton" },
    update: {
      siteName: raw.siteName,
      siteDescription: raw.siteDescription || null,
      logoUrl: raw.logoUrl || null,
      faviconUrl: raw.faviconUrl || null,
      accentColor: raw.accentColor,
      defaultLanguage: raw.defaultLanguage,
      maintenanceMode: Boolean(raw.maintenanceMode),
      footerText: raw.footerText || null,
      cvUrl: raw.cvUrl || null,
      analyticsEnabled: Boolean(raw.analyticsEnabled),
    },
    create: {
      id: "singleton",
      siteName: raw.siteName,
      accentColor: raw.accentColor,
      defaultLanguage: raw.defaultLanguage,
    },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/ar", "layout");
  revalidatePath("/en", "layout");
}
