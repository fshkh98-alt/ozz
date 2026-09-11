import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteExperience } from "./actions";

export default async function ExperienceAdminPage() {
  const items = await db.experience.findMany({ orderBy: { startDate: "desc" } });
  return (
    <div>
      <AdminPageHeader title="Experience" newHref="/admin/experience/new" />
      <DataTable
        rows={items}
        editHref={(row) => `/admin/experience/${row.id}`}
        columns={[
          { header: "Position", render: (e) => e.position },
          { header: "Company", render: (e) => e.company },
          { header: "Current", render: (e) => (e.current ? "Yes" : "No") },
          { header: "", render: (e) => <DeleteButton action={deleteExperience.bind(null, e.id)} /> },
        ]}
      />
    </div>
  );
}
