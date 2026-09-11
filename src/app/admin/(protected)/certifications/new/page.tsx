import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CertificationForm } from "@/components/admin/forms/CertificationForm";
import { createCertification } from "../actions";

export default function NewCertificationPage() {
  return (
    <div>
      <AdminPageHeader title="New Certification" />
      <CertificationForm action={createCertification} />
    </div>
  );
}
