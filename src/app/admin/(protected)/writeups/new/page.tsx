import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { WriteupForm } from "@/components/admin/forms/WriteupForm";
import { createWriteup } from "../actions";

export default function NewWriteupPage() {
  return (
    <div>
      <AdminPageHeader title="New Writeup" />
      <WriteupForm action={createWriteup} />
    </div>
  );
}
