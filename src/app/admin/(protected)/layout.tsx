import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import "@/styles/globals.css";
import "highlight.js/styles/github-dark.css";

// Every route under this group requires a valid session. This is
// defense-in-depth alongside middleware.ts (which blocks the request
// before it even reaches here) and requireAdmin() (checked again inside
// every Server Action that mutates data).
export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
