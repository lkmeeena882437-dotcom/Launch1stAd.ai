"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultBrandLinks, readBrandLinks, saveBrandLinks, type BrandLinks } from "@/lib/brandLinks";

const fields: Array<[keyof BrandLinks, string, string]> = [
  ["websiteUrl", "Website URL", "https://example.com"],
  ["appUrl", "App link", "Play Store / App Store link"],
  ["whatsappNumber", "WhatsApp number", "+91..."],
  ["instagramProfile", "Instagram profile", "https://instagram.com/..."],
  ["facebookPage", "Facebook page", "https://facebook.com/..."],
  ["youtubeChannel", "YouTube channel", "https://youtube.com/..."],
  ["telegramLink", "Telegram link", "https://t.me/..." ]
];

export function BrandLinksForm() {
  const [form, setForm] = useState<BrandLinks>(defaultBrandLinks);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(readBrandLinks());
  }, []);

  function update(key: keyof BrandLinks, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function submit() {
    saveBrandLinks(form);
    setSaved(true);
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-10">
      <div className="rounded-3xl bg-card p-6 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Promotion links</p>
        <h1 className="serif-display mt-3 text-4xl md:text-5xl">Connect what you want to promote.</h1>
        <p className="mt-4 leading-7 text-muted">Website, app, WhatsApp, Instagram, Facebook, YouTube aur Telegram links save karo. Campaign Builder me in links ko promotion destination ke roop me use kar sakte ho.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {fields.map(([key, label, placeholder]) => (
            <label key={key} className="grid gap-2 text-sm font-semibold">
              {label}
              <input value={form[key]} onChange={(event) => update(key, event.target.value)} placeholder={placeholder} className="rounded-xl border border-hairline bg-canvas px-4 py-3 text-base font-normal outline-none" />
            </label>
          ))}
        </div>
        {saved && <p className="mt-5 rounded-xl bg-canvas px-4 py-3 text-sm font-semibold text-coral">Saved. Ab campaign builder me promotion destination select karo.</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={submit} className="rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white">Save links</button>
          <Link href="/campaign" className="rounded-xl border border-hairline px-5 py-3 text-sm font-bold">Create campaign</Link>
        </div>
      </div>
    </section>
  );
}
