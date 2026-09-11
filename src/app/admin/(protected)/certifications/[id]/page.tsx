import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CertificationForm } from "@/components/admin/forms/CertificationForm";
import { updateCertification } from "../actions";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await db.certification.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <AdminPageHeader title="Edit Certification" />
      <CertificationForm item={item} action={updateCertification.bind(null, id)} />
    </div>
  );
}
