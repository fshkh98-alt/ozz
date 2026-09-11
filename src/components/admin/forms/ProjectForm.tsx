import { inputClass, labelClass } from "@/lib/utils";
import type { Project } from "@prisma/client";

const statuses = ["IDEA", "IN_PROGRESS", "COMPLETED", "ARCHIVED"];

function toInputDate(d?: Date | null) {
  return d ? d.toISOString().slice(0, 10) : "";
}

export function ProjectForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: Project;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div>
        <label className={labelClass} htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={item?.title} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="slug">Slug (url-friendly, e.g. ransomware-detector)</label>
        <input id="slug" name="slug" required defaultValue={item?.slug} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="shortDesc">Short description</label>
        <textarea id="shortDesc" name="shortDesc" required rows={2} defaultValue={item?.shortDesc} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="fullDesc">Full description</label>
        <textarea id="fullDesc" name="fullDesc" rows={3} defaultValue={item?.fullDesc ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="content">Content (long-form, plain text for now)</label>
        <textarea id="content" name="content" rows={6} defaultValue={item?.content ?? ""} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="category">Category</label>
          <input id="category" name="category" defaultValue={item?.category ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={item?.status ?? "IDEA"} className={inputClass}>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="technologies">Technologies (comma-separated)</label>
        <input id="technologies" name="technologies" defaultValue={item?.technologies.join(", ") ?? ""} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="githubUrl">GitHub URL</label>
          <input id="githubUrl" name="githubUrl" defaultValue={item?.githubUrl ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="demoUrl">Live demo URL</label>
          <input id="demoUrl" name="demoUrl" defaultValue={item?.demoUrl ?? ""} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="images">Image URLs (comma-separated)</label>
        <input id="images" name="images" defaultValue={item?.images.join(", ") ?? ""} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="startDate">Start date</label>
          <input id="startDate" name="startDate" type="date" defaultValue={toInputDate(item?.startDate)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="endDate">End date</label>
          <input id="endDate" name="endDate" type="date" defaultValue={toInputDate(item?.endDate)} className={inputClass} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-text">
        <input type="checkbox" name="featured" defaultChecked={item?.featured} />
        Featured
      </label>
      <button type="submit" className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg">
        Save
      </button>
    </form>
  );
}
