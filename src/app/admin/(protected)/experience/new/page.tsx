import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ExperienceForm } from "@/components/admin/forms/ExperienceForm";
import { createExperience } from "../actions";

export default function NewExperiencePage() {
  return (
    <div>
      <AdminPageHeader title="New Experience" />
      <ExperienceForm action={createExperience} />
    </div>
  );
}
