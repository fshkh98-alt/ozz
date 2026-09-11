import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteAchievement } from "./actions";

export default async function AchievementsAdminPage() {
  const items = await db.achievement.findMany({ orderBy: { date: "desc" } });
  return (
    <div>
      <AdminPageHeader title="Achievements" newHref="/admin/achievements/new" />
      <DataTable
        rows={items}
        editHref={(row) => `/admin/achievements/${row.id}`}
        columns={[
          { header: "Title", render: (a) => a.title },
          { header: "Category", render: (a) => a.category ?? "—" },
          { header: "", render: (a) => <DeleteButton action={deleteAchievement.bind(null, a.id)} /> },
        ]}
      />
    </div>
  );
}
