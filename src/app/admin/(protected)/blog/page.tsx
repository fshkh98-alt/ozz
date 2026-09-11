import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deletePost } from "./actions";

export default async function BlogAdminPage() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
  return (
    <div>
      <AdminPageHeader title="Blog" newHref="/admin/blog/new" />
      <DataTable
        rows={posts}
        editHref={(row) => `/admin/blog/${row.id}`}
        columns={[
          { header: "Title", render: (p) => p.title },
          { header: "Category", render: (p) => p.category?.name ?? "—" },
          { header: "Status", render: (p) => p.status },
          { header: "", render: (p) => <DeleteButton action={deletePost.bind(null, p.id)} /> },
        ]}
      />
    </div>
  );
}
