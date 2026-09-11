import { db } from "@/lib/db";

async function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="text-2xl font-semibold text-text">{value}</p>
      <p className="mt-1 text-xs text-text-muted">{label}</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [
    publishedPosts,
    draftPosts,
    projects,
    skills,
    experience,
    education,
    certifications,
    achievements,
    unreadMessages,
    recentMessages,
  ] = await Promise.all([
    db.post.count({ where: { status: "PUBLISHED" } }),
    db.post.count({ where: { status: "DRAFT" } }),
    db.project.count(),
    db.skill.count(),
    db.experience.count(),
    db.education.count(),
    db.certification.count(),
    db.achievement.count(),
    db.message.count({ where: { read: false } }),
    db.message.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold text-text">Overview</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Published posts" value={publishedPosts} />
        <StatCard label="Draft posts" value={draftPosts} />
        <StatCard label="Projects" value={projects} />
        <StatCard label="Skills" value={skills} />
        <StatCard label="Experience entries" value={experience} />
        <StatCard label="Education entries" value={education} />
        <StatCard label="Certifications" value={certifications} />
        <StatCard label="Achievements" value={achievements} />
        <StatCard label="Unread messages" value={unreadMessages} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-text-muted">Recent messages</h2>
        {recentMessages.length === 0 ? (
          <p className="text-sm text-text-muted">No messages yet.</p>
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border">
            {recentMessages.map((m) => (
              <div key={m.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <div>
                  <p className="font-medium text-text">
                    {m.name} <span className="text-text-muted">— {m.email}</span>
                  </p>
                  {m.subject && <p className="text-text-muted">{m.subject}</p>}
                </div>
                {!m.read && (
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                    new
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
