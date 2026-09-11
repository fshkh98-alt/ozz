"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ locale }: { locale: Locale }) {
  const t = locale === "ar" ? ar : en;
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="rounded-md bg-surface-2 p-4 text-sm text-text">{t.contact.success}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from real users via CSS, not `hidden` attribute
         (some bots skip fields marked hidden/display:none less reliably,
         but this is still just one layer alongside server-side checks). */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-text-muted">
          {t.contact.name}
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={120}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-text"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-text-muted">
          {t.contact.email}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-text"
        />
      </div>

      <div>
        <label htmlFor="subject" className="mb-1 block text-sm text-text-muted">
          {t.contact.subject}
        </label>
        <input
          id="subject"
          name="subject"
          maxLength={200}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-text"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-text-muted">
          {t.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-text"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-400">{t.contact.error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg disabled:opacity-50"
      >
        {status === "sending" ? t.contact.sending : t.contact.send}
      </button>
    </form>
  );
}
