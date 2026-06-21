import type { CampaignInput } from "@/lib/campaign";
import { adPlatforms, promotionTypes } from "./data";
import { Field, inputClass } from "./Field";

export function PromotionFields({ form, update }: {
  form: CampaignInput;
  update: <K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) => void;
}) {
  const selected = form.targetPlatforms || [];

  function togglePlatform(platform: string) {
    const next = selected.includes(platform)
      ? selected.filter((item) => item !== platform)
      : [...selected, platform];
    update("targetPlatforms", next);
  }

  return (
    <div className="space-y-5">
      <Field label="What do you want to promote?">
        <select className={inputClass} value={form.promotionType || "WhatsApp"} onChange={(event) => update("promotionType", event.target.value as CampaignInput["promotionType"])}>
          {promotionTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
      </Field>
      <Field label="Promotion link / destination">
        <input className={inputClass} value={form.promotionLink || ""} onChange={(event) => update("promotionLink", event.target.value)} placeholder="Website, app, Telegram, Instagram, Facebook, YouTube or WhatsApp link" />
      </Field>
      <div>
        <p className="mb-3 text-sm font-semibold">Where should ads run?</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {adPlatforms.map((platform) => (
            <button key={platform} type="button" onClick={() => togglePlatform(platform)} className={selected.includes(platform) ? "rounded-xl bg-coral px-4 py-3 text-left text-sm font-semibold text-white" : "rounded-xl border border-hairline bg-canvas px-4 py-3 text-left text-sm font-semibold text-ink"}>
              {platform}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
