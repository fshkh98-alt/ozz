import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function SeoAdminPage() {
  const settings = await db.siteSettings.findUnique({ where: { id: "singleton" } });

  return (
    <div className="max-w-2xl space-y-4">
      <AdminPageHeader title="SEO" />
      <p className="text-sm text-text-muted">
        Site-wide SEO defaults (name, description, accent color, default
        language) live in <a className="text-accent" href="/admin/settings">Settings</a>.
      </p>
      <p className="text-sm text-text-muted">
        Per-page SEO: every Blog post has its own SEO title, description and
        canonical URL fields directly on its edit page. The same fields can
        be added to Projects/Writeups later using the exact same pattern.
      </p>
      <p className="text-sm text-text-muted">
        <code>sitemap.xml</code> and <code>robots.txt</code> are generated
        automatically from the database (see <code>src/app/sitemap.ts</code>
        and <code>src/app/robots.ts</code>) — nothing to manage here.
      </p>
      <p className="text-sm text-text-muted">
        Current site name: <strong className="text-text">{settings?.siteName ?? "Ozaib"}</strong>
      </p>
    </div>
  );
}
