import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SkillForm } from "@/components/admin/forms/SkillForm";
import { updateSkill } from "../actions";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await db.skill.findUnique({ where: { id } });
  if (!skill) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Skill" />
      <SkillForm skill={skill} action={updateSkill.bind(null, id)} />
    </div>
  );
}
