import { inputClass, labelClass } from "@/lib/utils";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { Post, Category, Tag } from "@prisma/client";

const statuses = ["DRAFT", "PUBLISHED", "SCHEDULED"];

type PostWithRelations = Post & { category: Category | null; tags: Tag[] };

export function PostForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: PostWithRelations;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div>
        <label className={labelClass} htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={item?.title} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="slug">Slug</label>
        <input id="slug" name="slug" required defaultValue={item?.slug} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="excerpt">Excerpt</label>
        <textarea id="excerpt" name="excerpt" rows={2} defaultValue={item?.excerpt ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="content">Content</label>
        <RichTextEditor name="content" defaultValue={item?.content ?? ""} />
      </div>
      <div>
        <label className={labelClass} htmlFor="coverImage">Cover image URL</label>
        <input id="coverImage" name="coverImage" defaultValue={item?.coverImage ?? ""} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="categoryName">Category</label>
          <input id="categoryName" name="categoryName" defaultValue={item?.category?.name ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={item?.status ?? "DRAFT"} className={inputClass}>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="tags">Tags (comma-separated)</label>
        <input id="tags" name="tags" defaultValue={item?.tags.map((t) => t.name).join(", ") ?? ""} className={inputClass} />
      </div>
      <label className="flex items-center gap-2 text-sm text-text">
        <input type="checkbox" name="featured" defaultChecked={item?.featured} />
        Featured
      </label>

      <fieldset className="space-y-3 rounded-md border border-border p-4">
        <legend className="px-1 text-xs font-medium uppercase tracking-wide text-text-muted">SEO</legend>
        <div>
          <label className={labelClass} htmlFor="seoTitle">SEO title</label>
          <input id="seoTitle" name="seoTitle" defaultValue={item?.seoTitle ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="seoDescription">SEO description</label>
          <textarea id="seoDescription" name="seoDescription" rows={2} defaultValue={item?.seoDescription ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="canonicalUrl">Canonical URL</label>
          <input id="canonicalUrl" name="canonicalUrl" defaultValue={item?.canonicalUrl ?? ""} className={inputClass} />
        </div>
      </fieldset>

      <button type="submit" className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg">
        Save
      </button>
    </form>
  );
}
