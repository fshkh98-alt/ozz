import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SkillForm } from "@/components/admin/forms/SkillForm";
import { createSkill } from "../actions";

export default function NewSkillPage() {
  return (
    <div>
      <AdminPageHeader title="New Skill" />
      <SkillForm action={createSkill} />
    </div>
  );
}
