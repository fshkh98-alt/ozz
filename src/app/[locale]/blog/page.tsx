import Link from "next/link";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;

  const posts = await db.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    include: { category: true, tags: true },
  });

  if (posts.length === 0) return <EmptyState message={t.common.empty} />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">{t.nav.blog}</h1>
      <div className="grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.id} href={`/${locale}/blog/${post.slug}`}>
            <Card>
              {post.category && (
                <span className="text-xs uppercase tracking-wide text-accent">
                  {post.category.name}
                </span>
              )}
              <h2 className="mt-2 text-lg font-medium">{post.title}</h2>
              {post.excerpt && <p className="mt-2 text-sm text-text-muted">{post.excerpt}</p>}
              <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                <span>
                  {post.publishedAt &&
                    new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(post.publishedAt)}
                </span>
                {post.readingTime && <span>{post.readingTime} min</span>}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
