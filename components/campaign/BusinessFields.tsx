import type { CampaignInput } from "@/lib/campaign";
import { categories } from "./data";
import { Field, inputClass } from "./Field";

export function BusinessFields({ form, update }: {
  form: CampaignInput;
  update: <K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) => void;
}) {
  return (
    <>
      <Field label="Business name"><input className={inputClass} value={form.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="Example: Lucky Fashion Store" /></Field>
      <Field label="Business category"><select className={inputClass} value={form.category} onChange={(e) => update("category", e.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select></Field>
      <Field label="Product / service"><input className={inputClass} value={form.product} onChange={(e) => update("product", e.target.value)} placeholder="Example: Women ethnic wear under ₹999" required /></Field>
    </>
  );
}
