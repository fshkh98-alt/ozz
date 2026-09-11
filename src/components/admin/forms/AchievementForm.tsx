import { inputClass, labelClass } from "@/lib/utils";
import type { Achievement } from "@prisma/client";

function toInputDate(d?: Date | null) {
  return d ? d.toISOString().slice(0, 10) : "";
}

export function AchievementForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: Achievement;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div>
        <label className={labelClass} htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={item?.title} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="date">Date</label>
        <input id="date" name="date" type="date" required defaultValue={toInputDate(item?.date)} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="category">Category</label>
        <input id="category" name="category" defaultValue={item?.category ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="url">URL</label>
        <input id="url" name="url" defaultValue={item?.url ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" name="imageUrl" defaultValue={item?.imageUrl ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={3} defaultValue={item?.description ?? ""} className={inputClass} />
      </div>
      <button type="submit" className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg">
        Save
      </button>
    </form>
  );
}
