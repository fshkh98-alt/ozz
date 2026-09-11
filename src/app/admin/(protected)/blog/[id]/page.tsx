import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostForm } from "@/components/admin/forms/PostForm";
import { updatePost } from "../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await db.post.findUnique({ where: { id }, include: { category: true, tags: true } });
  if (!item) notFound();
  return (
    <div>
      <AdminPageHeader title="Edit Post" />
      <PostForm item={item} action={updatePost.bind(null, id)} />
    </div>
  );
}
