export function EmailField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">Email address</span>
      <input
        type="email"
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="you@example.com"
        className="mt-2 w-full rounded-lg border border-hairline bg-canvas px-4 py-3 outline-coral"
      />
    </label>
  );
}
