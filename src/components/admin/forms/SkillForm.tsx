import { inputClass, labelClass } from "@/lib/utils";
import type { Skill } from "@prisma/client";

const categories = ["PROGRAMMING", "CYBERSECURITY", "NETWORKING", "OS", "TOOLS", "OTHER"];
const levels = ["EXPLORING", "LEARNING", "FAMILIAR", "INTERMEDIATE", "ADVANCED"];

export function SkillForm({
  action,
  skill,
}: {
  action: (formData: FormData) => Promise<void>;
  skill?: Skill;
}) {
  return (
    <form action={action} className="max-w-md space-y-4">
      <div>
        <label className={labelClass} htmlFor="name">Name</label>
        <input id="name" name="name" required defaultValue={skill?.name} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="category">Category</label>
        <select id="category" name="category" defaultValue={skill?.category ?? "OTHER"} className={inputClass}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="level">Level</label>
        <select id="level" name="level" defaultValue={skill?.level ?? "EXPLORING"} className={inputClass}>
          {levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="order">Order</label>
        <input id="order" name="order" type="number" defaultValue={skill?.order ?? 0} className={inputClass} />
      </div>
      <button type="submit" className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg">
        Save
      </button>
    </form>
  );
}
