import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EducationForm } from "@/components/admin/forms/EducationForm";
import { updateEducation } from "../actions";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await db.education.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <AdminPageHeader title="Edit Education" />
      <EducationForm item={item} action={updateEducation.bind(null, id)} />
    </div>
  );
}
