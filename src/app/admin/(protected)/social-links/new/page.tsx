import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SocialLinkForm } from "@/components/admin/forms/SocialLinkForm";
import { createSocialLink } from "../actions";

export default function NewSocialLinkPage() {
  return (
    <div>
      <AdminPageHeader title="New Social Link" />
      <SocialLinkForm action={createSocialLink} />
    </div>
  );
}
