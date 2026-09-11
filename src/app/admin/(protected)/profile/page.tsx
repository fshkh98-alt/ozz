import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { inputClass, labelClass } from "@/lib/utils";
import { updateProfile } from "./actions";

export default async function ProfileAdminPage() {
  const profile = await db.profile.findFirst();

  return (
    <div>
      <AdminPageHeader title="About / Profile" />
      <form action={updateProfile} className="max-w-2xl space-y-4">
        <div>
          <label className={labelClass} htmlFor="displayName">Display name</label>
          <input id="displayName" name="displayName" required defaultValue={profile?.displayName ?? "Ozaib"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="title">Title</label>
          <input id="title" name="title" required defaultValue={profile?.title ?? "Cybersecurity Student"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="shortBio">Short bio (shown on homepage)</label>
          <textarea id="shortBio" name="shortBio" rows={2} defaultValue={profile?.shortBio ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="longBio">Long bio (shown on About page)</label>
          <textarea id="longBio" name="longBio" rows={6} defaultValue={profile?.longBio ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="currentFocus">Current focus</label>
          <textarea id="currentFocus" name="currentFocus" rows={3} defaultValue={profile?.currentFocus ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="interests">Interests</label>
          <textarea id="interests" name="interests" rows={2} defaultValue={profile?.interests ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="avatarUrl">Avatar URL (optional — the site works fully without one)</label>
          <input id="avatarUrl" name="avatarUrl" defaultValue={profile?.avatarUrl ?? ""} className={inputClass} />
        </div>
        <button type="submit" className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg">
          Save
        </button>
      </form>
    </div>
  );
}
