import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { sanitizeContent } from "@/lib/sanitize";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? undefined,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
    include: { category: true, tags: true },
  });

  if (!post || post.status !== "PUBLISHED") notFound();

  // Content is already sanitized at write-time (see admin actions), but we
  // sanitize again here too — defense-in-depth in case a row was ever
  // edited directly in the database, bypassing the admin form.
  const safeContent = sanitizeContent(post.content);

  return (
    <article className="prose prose-invert mx-auto max-w-2xl">
      <h1>{post.title}</h1>
      <div className="not-prose mb-6 flex flex-wrap gap-2 text-xs text-text-muted">
        {post.category && <span>{post.category.name}</span>}
        {post.tags.map((tag) => (
          <span key={tag.id} className="rounded-md bg-surface-2 px-2 py-1">
            #{tag.name}
          </span>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: safeContent }} />
    </article>
  );
}
