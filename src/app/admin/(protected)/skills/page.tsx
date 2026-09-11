import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSkill } from "./actions";

export default async function SkillsAdminPage() {
  const skills = await db.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });

  return (
    <div>
      <AdminPageHeader title="Skills" newHref="/admin/skills/new" />
      <DataTable
        rows={skills}
        editHref={(row) => `/admin/skills/${row.id}`}
        emptyMessage="No skills yet. Add your first one."
        columns={[
          { header: "Name", render: (s) => s.name },
          { header: "Category", render: (s) => s.category },
          { header: "Level", render: (s) => s.level },
          {
            header: "",
            render: (s) => (
              <DeleteButton action={deleteSkill.bind(null, s.id)} />
            ),
          },
        ]}
      />
    </div>
  );
}
