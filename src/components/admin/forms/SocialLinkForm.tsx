import { inputClass, labelClass } from "@/lib/utils";
import type { SocialLink } from "@prisma/client";

export function SocialLinkForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: SocialLink;
}) {
  return (
    <form action={action} className="max-w-md space-y-4">
      <div>
        <label className={labelClass} htmlFor="platform">Platform (e.g. GitHub, Telegram)</label>
        <input id="platform" name="platform" required defaultValue={item?.platform} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="url">URL</label>
        <input id="url" name="url" type="url" required defaultValue={item?.url} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="label">Display label</label>
        <input id="label" name="label" defaultValue={item?.label ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="order">Order</label>
        <input id="order" name="order" type="number" defaultValue={item?.order ?? 0} className={inputClass} />
      </div>
      <label className="flex items-center gap-2 text-sm text-text">
        <input type="checkbox" name="visible" defaultChecked={item?.visible ?? true} />
        Visible on public site
      </label>
      <button type="submit" className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg">
        Save
      </button>
    </form>
  );
}
