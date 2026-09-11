import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AchievementForm } from "@/components/admin/forms/AchievementForm";
import { createAchievement } from "../actions";

export default function NewAchievementPage() {
  return (
    <div>
      <AdminPageHeader title="New Achievement" />
      <AchievementForm action={createAchievement} />
    </div>
  );
}
