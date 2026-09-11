import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectForm } from "@/components/admin/forms/ProjectForm";
import { updateProject } from "../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await db.project.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <AdminPageHeader title="Edit Project" />
      <ProjectForm item={item} action={updateProject.bind(null, id)} />
    </div>
  );
}
