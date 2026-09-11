import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { WriteupForm } from "@/components/admin/forms/WriteupForm";
import { updateWriteup } from "../actions";

export default async function EditWriteupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await db.writeup.findUnique({ where: { id }, include: { tags: true } });
  if (!item) notFound();
  return (
    <div>
      <AdminPageHeader title="Edit Writeup" />
      <WriteupForm item={item} action={updateWriteup.bind(null, id)} />
    </div>
  );
}
