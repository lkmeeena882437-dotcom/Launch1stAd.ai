import type { CampaignInput } from "@/lib/campaign";
import { goals, languages } from "./data";
import { Field, inputClass } from "./Field";

export function TargetFields({ form, update }: {
  form: CampaignInput;
  update: <K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) => void;
}) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Price range"><input className={inputClass} value={form.priceRange} onChange={(e) => update("priceRange", e.target.value)} placeholder="₹499–₹1499" /></Field>
        <Field label="Location"><input className={inputClass} value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Kota / Rajasthan / India" /></Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Daily budget"><input className={inputClass} value={form.budget} onChange={(e) => update("budget", e.target.value)} /></Field>
        <Field label="Goal"><select className={inputClass} value={form.goal} onChange={(e) => update("goal", e.target.value as CampaignInput["goal"])}>{goals.map((goal) => <option key={goal}>{goal}</option>)}</select></Field>
        <Field label="Language"><select className={inputClass} value={form.language} onChange={(e) => update("language", e.target.value as CampaignInput["language"])}>{languages.map((language) => <option key={language}>{language}</option>)}</select></Field>
      </div>
    </>
  );
}
