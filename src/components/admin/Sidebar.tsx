import Link from "next/link";
import { signOut } from "@/lib/auth";

const sections: { title: string; items: { href: string; label: string }[] }[] = [
  { title: "", items: [{ href: "/admin", label: "Dashboard" }] },
  {
    title: "Content",
    items: [
      { href: "/admin/blog", label: "Blog" },
      { href: "/admin/writeups", label: "Writeups" },
      { href: "/admin/projects", label: "Projects" },
      { href: "/admin/achievements", label: "Achievements" },
    ],
  },
  {
    title: "Profile",
    items: [
      { href: "/admin/profile", label: "About" },
      { href: "/admin/skills", label: "Skills" },
      { href: "/admin/experience", label: "Experience" },
      { href: "/admin/education", label: "Education" },
      { href: "/admin/certifications", label: "Certifications" },
    ],
  },
  {
    title: "",
    items: [
      { href: "/admin/social-links", label: "Social Links" },
      { href: "/admin/media", label: "Media" },
      { href: "/admin/messages", label: "Messages" },
      { href: "/admin/analytics", label: "Analytics" },
      { href: "/admin/seo", label: "SEO" },
      { href: "/admin/settings", label: "Settings" },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-60 flex-col justify-between border-r border-border bg-surface/90 p-4 shadow-soft">
      <div>
        <Link href="/admin" className="mb-6 block text-lg font-semibold tracking-tight text-text">
          Ozaib Admin
        </Link>
        <nav className="space-y-5">
          {sections.map((section, i) => (
            <div key={i}>
              {section.title && (
                <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                  {section.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-sm text-text-muted transition hover:bg-surface-2 hover:text-text"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/admin/login" });
        }}
      >
        <button
          type="submit"
          className="w-full rounded-md border border-border px-3 py-2 text-sm text-text-muted hover:bg-surface-2 hover:text-text"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}
