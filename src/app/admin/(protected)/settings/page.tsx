import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { inputClass, labelClass } from "@/lib/utils";
import { updateSettings } from "./actions";

export default async function SettingsAdminPage() {
  const settings = await db.siteSettings.findUnique({ where: { id: "singleton" } });

  return (
    <div>
      <AdminPageHeader title="Settings" />
      <form action={updateSettings} className="max-w-lg space-y-4">
        <div>
          <label className={labelClass} htmlFor="siteName">Site name</label>
          <input id="siteName" name="siteName" required defaultValue={settings?.siteName ?? "Ozaib"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="siteDescription">Site description</label>
          <textarea id="siteDescription" name="siteDescription" rows={2} defaultValue={settings?.siteDescription ?? ""} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="logoUrl">Logo URL</label>
            <input id="logoUrl" name="logoUrl" defaultValue={settings?.logoUrl ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="faviconUrl">Favicon URL</label>
            <input id="faviconUrl" name="faviconUrl" defaultValue={settings?.faviconUrl ?? ""} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="accentColor">Accent color (hex)</label>
            <input id="accentColor" name="accentColor" defaultValue={settings?.accentColor ?? "#2DD4BF"} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="defaultLanguage">Default language</label>
            <select id="defaultLanguage" name="defaultLanguage" defaultValue={settings?.defaultLanguage ?? "ar"} className={inputClass}>
              <option value="ar">Arabic</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="cvUrl">CV file URL (Download CV button appears once this is set)</label>
          <input id="cvUrl" name="cvUrl" defaultValue={settings?.cvUrl ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="footerText">Footer text</label>
          <input id="footerText" name="footerText" defaultValue={settings?.footerText ?? ""} className={inputClass} />
        </div>
        <label className="flex items-center gap-2 text-sm text-text">
          <input type="checkbox" name="analyticsEnabled" defaultChecked={settings?.analyticsEnabled ?? true} />
          Enable analytics tracking
        </label>
        <label className="flex items-center gap-2 text-sm text-text">
          <input type="checkbox" name="maintenanceMode" defaultChecked={settings?.maintenanceMode ?? false} />
          Maintenance mode
        </label>
        <button type="submit" className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg">
          Save
        </button>
      </form>
    </div>
  );
}
