import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SocialLinkForm } from "@/components/admin/forms/SocialLinkForm";
import { updateSocialLink } from "../actions";

export default async function EditSocialLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await db.socialLink.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <AdminPageHeader title="Edit Social Link" />
      <SocialLinkForm item={item} action={updateSocialLink.bind(null, id)} />
    </div>
  );
}
