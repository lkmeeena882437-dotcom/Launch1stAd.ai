import type { CampaignInput } from "@/lib/campaign";
import { audiencePresets, currencies, goals, languages, paymentModels } from "./data";
import { Field, inputClass } from "./Field";

export function TargetFields({ form, update }: {
  form: CampaignInput;
  update: <K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) => void;
}) {
  const presets = audiencePresets[form.category] || audiencePresets.Default;

  return (
    <>
      <div className="rounded-2xl border border-hairline bg-canvas p-4 text-sm leading-6 text-muted">
        India-first targeting active hai. City/state likhoge to campaign India ke andar us location ke hisaab se plan banayega.
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Price range"><input className={inputClass} value={form.priceRange || ""} onChange={(e) => update("priceRange", e.target.value)} placeholder="₹499–₹1499" /></Field>
        <Field label="Target location in India"><input className={inputClass} value={form.location || "India"} onChange={(e) => update("location", e.target.value)} placeholder="India / Rajasthan / Kota" /></Field>
      </div>
      <Field label="Audience preset / customer segment">
        <select className={inputClass} value={form.audienceType || ""} onChange={(e) => update("audienceType", e.target.value)}>
          <option value="">Select customer segment</option>
          {presets.map((preset) => <option key={preset}>{preset}</option>)}
        </select>
      </Field>
      <Field label="Custom interests / search keywords"><input className={inputClass} value={form.interests || ""} onChange={(e) => update("interests", e.target.value)} placeholder="Indian buyers, local intent, competitor names" /></Field>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Daily budget"><input className={inputClass} value={form.budget || "₹500/day"} onChange={(e) => update("budget", e.target.value)} /></Field>
        <Field label="Total budget"><input className={inputClass} value={form.totalBudget || ""} onChange={(e) => update("totalBudget", e.target.value)} placeholder="₹3500/week" /></Field>
        <Field label="Currency"><select className={inputClass} value={form.currency || "INR"} onChange={(e) => update("currency", e.target.value as CampaignInput["currency"])}>{currencies.map((currency) => <option key={currency}>{currency}</option>)}</select></Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Goal"><select className={inputClass} value={form.goal || "WhatsApp"} onChange={(e) => update("goal", e.target.value as CampaignInput["goal"])}>{goals.map((goal) => <option key={goal}>{goal}</option>)}</select></Field>
        <Field label="Payment model"><select className={inputClass} value={form.paymentModel || "Auto"} onChange={(e) => update("paymentModel", e.target.value as CampaignInput["paymentModel"])}>{paymentModels.map((model) => <option key={model}>{model}</option>)}</select></Field>
        <Field label="Language"><select className={inputClass} value={form.language || "Hinglish"} onChange={(e) => update("language", e.target.value as CampaignInput["language"])}>{languages.map((language) => <option key={language}>{language}</option>)}</select></Field>
      </div>
    </>
  );
}
