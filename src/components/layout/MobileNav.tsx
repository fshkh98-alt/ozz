"use client";

import { useState } from "react";
import Link from "next/link";

export function MobileNav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="rounded-xl border border-border bg-surface/70 p-2 text-text shadow-soft"
      >
        <span className="block h-0.5 w-5 bg-current" />
        <span className="mt-1 block h-0.5 w-5 bg-current" />
        <span className="mt-1 block h-0.5 w-5 bg-current" />
      </button>

      {open && (
        <ul className="absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-border bg-bg/95 px-4 py-4 text-sm shadow-soft backdrop-blur-xl">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-text-muted hover:bg-surface-2 hover:text-text"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
