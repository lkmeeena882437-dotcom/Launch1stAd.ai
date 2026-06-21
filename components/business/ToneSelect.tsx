const tones = ["Local Hindi", "Premium", "Youth", "Trust", "Urgent Offer"];

export function ToneSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">Brand tone</span>
      <select
        className="mt-2 w-full rounded-lg border border-hairline bg-canvas px-4 py-3 outline-coral"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {tones.map((tone) => <option key={tone}>{tone}</option>)}
      </select>
    </label>
  );
}
