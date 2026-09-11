import { inputClass, labelClass } from "@/lib/utils";
import type { Experience } from "@prisma/client";

function toInputDate(d?: Date | null) {
  return d ? d.toISOString().slice(0, 10) : "";
}

export function ExperienceForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: Experience;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div>
        <label className={labelClass} htmlFor="position">Position</label>
        <input id="position" name="position" required defaultValue={item?.position} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="company">Company</label>
        <input id="company" name="company" required defaultValue={item?.company} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="companyUrl">Company URL</label>
        <input id="companyUrl" name="companyUrl" defaultValue={item?.companyUrl ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="location">Location</label>
        <input id="location" name="location" defaultValue={item?.location ?? ""} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="startDate">Start date</label>
          <input id="startDate" name="startDate" type="date" required defaultValue={toInputDate(item?.startDate)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="endDate">End date</label>
          <input id="endDate" name="endDate" type="date" defaultValue={toInputDate(item?.endDate)} className={inputClass} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-text">
        <input type="checkbox" name="current" defaultChecked={item?.current} />
        Currently working here
      </label>
      <div>
        <label className={labelClass} htmlFor="technologies">Technologies (comma-separated)</label>
        <input id="technologies" name="technologies" defaultValue={item?.technologies.join(", ") ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={4} defaultValue={item?.description ?? ""} className={inputClass} />
      </div>
      <button type="submit" className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg">
        Save
      </button>
    </form>
  );
}
