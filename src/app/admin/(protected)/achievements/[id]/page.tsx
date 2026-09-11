import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AchievementForm } from "@/components/admin/forms/AchievementForm";
import { updateAchievement } from "../actions";

export default async function EditAchievementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await db.achievement.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <AdminPageHeader title="Edit Achievement" />
      <AchievementForm item={item} action={updateAchievement.bind(null, id)} />
    </div>
  );
}
