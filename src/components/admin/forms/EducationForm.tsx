import { inputClass, labelClass } from "@/lib/utils";
import type { Education } from "@prisma/client";

function toInputDate(d?: Date | null) {
  return d ? d.toISOString().slice(0, 10) : "";
}

export function EducationForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: Education;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div>
        <label className={labelClass} htmlFor="degree">Degree</label>
        <input id="degree" name="degree" required defaultValue={item?.degree} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="field">Field</label>
        <input id="field" name="field" defaultValue={item?.field ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="institution">Institution</label>
        <input id="institution" name="institution" required defaultValue={item?.institution} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="link">Institution URL</label>
        <input id="link" name="link" defaultValue={item?.link ?? ""} className={inputClass} />
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
        Currently studying here
      </label>
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
