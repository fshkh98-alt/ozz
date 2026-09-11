import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EducationForm } from "@/components/admin/forms/EducationForm";
import { createEducation } from "../actions";

export default function NewEducationPage() {
  return (
    <div>
      <AdminPageHeader title="New Education" />
      <EducationForm action={createEducation} />
    </div>
  );
}
