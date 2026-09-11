import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProject } from "./actions";

export default async function ProjectsAdminPage() {
  const items = await db.project.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminPageHeader title="Projects" newHref="/admin/projects/new" />
      <DataTable
        rows={items}
        editHref={(row) => `/admin/projects/${row.id}`}
        columns={[
          { header: "Title", render: (p) => p.title },
          { header: "Status", render: (p) => p.status },
          { header: "Featured", render: (p) => (p.featured ? "Yes" : "No") },
          { header: "", render: (p) => <DeleteButton action={deleteProject.bind(null, p.id)} /> },
        ]}
      />
    </div>
  );
}
