import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteEducation } from "./actions";

export default async function EducationAdminPage() {
  const items = await db.education.findMany({ orderBy: { startDate: "desc" } });
  return (
    <div>
      <AdminPageHeader title="Education" newHref="/admin/education/new" />
      <DataTable
        rows={items}
        editHref={(row) => `/admin/education/${row.id}`}
        columns={[
          { header: "Degree", render: (e) => e.degree },
          { header: "Institution", render: (e) => e.institution },
          { header: "Current", render: (e) => (e.current ? "Yes" : "No") },
          { header: "", render: (e) => <DeleteButton action={deleteEducation.bind(null, e.id)} /> },
        ]}
      />
    </div>
  );
}
