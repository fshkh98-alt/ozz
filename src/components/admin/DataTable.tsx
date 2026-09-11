import type { ReactNode } from "react";
import Link from "next/link";

interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
}

export function DataTable<T extends { id: string }>({
  rows,
  columns,
  editHref,
  emptyMessage = "No records yet.",
}: {
  rows: T[];
  columns: Column<T>[];
  editHref: (row: T) => string;
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-2 text-xs uppercase text-text-muted">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-3 font-medium">
                {col.header}
              </th>
            ))}
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-border">
              {columns.map((col) => (
                <td key={col.header} className="px-4 py-3 text-text">
                  {col.render(row)}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <Link href={editHref(row)} className="text-accent hover:underline">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
