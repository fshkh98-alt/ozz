import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteWriteup } from "./actions";

export default async function WriteupsAdminPage() {
  const items = await db.writeup.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminPageHeader title="Writeups" newHref="/admin/writeups/new" />
      <DataTable
        rows={items}
        editHref={(row) => `/admin/writeups/${row.id}`}
        columns={[
          { header: "Title", render: (w) => w.title },
          { header: "Type", render: (w) => w.type },
          { header: "Status", render: (w) => w.status },
          { header: "", render: (w) => <DeleteButton action={deleteWriteup.bind(null, w.id)} /> },
        ]}
      />
    </div>
  );
}
