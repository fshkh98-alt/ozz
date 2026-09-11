import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { markMessageRead, deleteMessage } from "./actions";

export default async function MessagesAdminPage() {
  const messages = await db.message.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader title="Messages" />
      {messages.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-text-muted">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-text">
                    {m.name} <span className="text-text-muted">— {m.email}</span>
                  </p>
                  {m.subject && <p className="text-sm text-text-muted">{m.subject}</p>}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {!m.read && <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">new</span>}
                  <form action={markMessageRead.bind(null, m.id, !m.read)}>
                    <button type="submit" className="text-accent hover:underline">
                      {m.read ? "Mark unread" : "Mark read"}
                    </button>
                  </form>
                  <DeleteButton action={deleteMessage.bind(null, m.id)} />
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-text">{m.message}</p>
              <p className="mt-2 text-xs text-text-muted">
                {new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(m.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
