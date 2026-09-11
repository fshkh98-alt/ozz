import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { db } from "@/lib/db";

export async function Footer({ locale }: { locale: Locale }) {
  const socialLinks = await db.socialLink.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });

  return (
    <footer className="mt-24 border-t border-border bg-surface/30 py-12">
      <div className="site-container flex flex-col items-center gap-4 text-center text-sm text-text-muted">
        <p>Ozaib — Cybersecurity Student</p>
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text"
              >
                {link.label ?? link.platform}
              </a>
            ))}
          </div>
        )}
        <p>© {new Date().getFullYear()} Ozaib. All rights reserved.</p>
      </div>
    </footer>
  );
}
