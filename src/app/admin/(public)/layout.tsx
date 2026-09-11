import type { ReactNode } from "react";
import "@/styles/globals.css";

// This route group has NO auth guard — it only ever contains
// /admin/login. It is its own root layout (sibling to the
// (protected) group), so an unauthenticated visitor can always
// reach the login page without hitting a redirect loop.
export default function AdminPublicLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        {children}
      </body>
    </html>
  );
}
