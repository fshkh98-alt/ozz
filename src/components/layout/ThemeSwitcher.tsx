"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme | null) ?? "system";
    setTheme(stored);
    applyTheme(stored);
  }, []);

  function applyTheme(value: Theme) {
    const root = document.documentElement;
    const resolved =
      value === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : value;
    root.setAttribute("data-theme", resolved);
  }

  function handleChange(value: Theme) {
    setTheme(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
  }

  return (
    <div className="hidden items-center gap-1 rounded-full border border-border bg-surface/70 p-1 text-[11px] sm:flex">
      {(["dark", "light", "system"] as Theme[]).map((t) => (
        <button
          key={t}
          onClick={() => handleChange(t)}
          aria-pressed={theme === t}
          className={`rounded-full px-2.5 py-1 transition-all ${
            theme === t ? "bg-accent text-bg" : "text-text-muted hover:text-text"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
