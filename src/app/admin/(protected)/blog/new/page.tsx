import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostForm } from "@/components/admin/forms/PostForm";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <AdminPageHeader title="New Post" />
      <PostForm action={createPost} />
    </div>
  );
}
