import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function MediaAdminPage() {
  const media = await db.media.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader title="Media" />
      <p className="mb-6 max-w-xl text-sm text-text-muted">
        File uploads need a storage backend (Vercel Blob, S3, or Supabase
        Storage) with its own credentials — not something to wire up without
        your chosen provider. For now, every field across the site that takes
        an image (avatar, project images, blog cover, certificate file, CV)
        accepts a direct URL, so you can host files anywhere you like and
        paste the link in. Once you pick a storage provider, this page is
        where the upload form and the library below will live.
      </p>
      {media.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-text-muted">
          No media records yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {media.map((m) => (
            <div key={m.id} className="rounded-md border border-border p-2 text-xs text-text-muted">
              {m.url}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
