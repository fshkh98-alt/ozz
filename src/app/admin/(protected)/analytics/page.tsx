import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function AnalyticsAdminPage() {
  const settings = await db.siteSettings.findUnique({ where: { id: "singleton" } });

  if (!settings?.analyticsEnabled) {
    return (
      <div>
        <AdminPageHeader title="Analytics" />
        <p className="text-sm text-text-muted">
          Analytics is currently disabled in Settings. Enable it there to start
          collecting privacy-friendly page view counts.
        </p>
      </div>
    );
  }

  const [totalViews, byPath, last30Days] = await Promise.all([
    db.pageView.count(),
    db.pageView.groupBy({
      by: ["path"],
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),
    db.pageView.count({
      where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    }),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader title="Analytics" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-5">
          <p className="text-2xl font-semibold text-text">{totalViews}</p>
          <p className="mt-1 text-xs text-text-muted">Total page views</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-5">
          <p className="text-2xl font-semibold text-text">{last30Days}</p>
          <p className="mt-1 text-xs text-text-muted">Views (last 30 days)</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-text-muted">Most viewed pages</h2>
        {byPath.length === 0 ? (
          <p className="text-sm text-text-muted">No page views recorded yet.</p>
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border">
            {byPath.map((row) => (
              <div key={row.path} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-text">{row.path}</span>
                <span className="text-text-muted">{row._count.path}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="text-xs text-text-muted">
        Note: this page reads from the <code>PageView</code> table. A lightweight
        server-side pageview logger (writing one row per request, without
        storing full IPs) is the natural next addition — not included yet to
        avoid collecting data before you decide exactly what to record.
      </p>
    </div>
  );
}
