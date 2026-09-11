import Link from "next/link";

export function AdminPageHeader({
  title,
  newHref,
}: {
  title: string;
  newHref?: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-text">{title}</h1>
      {newHref && (
        <Link
          href={newHref}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg"
        >
          + New
        </Link>
      )}
    </div>
  );
}
