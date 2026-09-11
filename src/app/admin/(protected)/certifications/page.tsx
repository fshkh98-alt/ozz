import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteCertification } from "./actions";

export default async function CertificationsAdminPage() {
  const items = await db.certification.findMany({ orderBy: { issueDate: "desc" } });
  return (
    <div>
      <AdminPageHeader title="Certifications" newHref="/admin/certifications/new" />
      <DataTable
        rows={items}
        editHref={(row) => `/admin/certifications/${row.id}`}
        columns={[
          { header: "Name", render: (c) => c.name },
          { header: "Issuer", render: (c) => c.issuer },
          { header: "", render: (c) => <DeleteButton action={deleteCertification.bind(null, c.id)} /> },
        ]}
      />
    </div>
  );
}
