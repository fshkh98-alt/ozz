import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectForm } from "@/components/admin/forms/ProjectForm";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader title="New Project" />
      <ProjectForm action={createProject} />
    </div>
  );
}
