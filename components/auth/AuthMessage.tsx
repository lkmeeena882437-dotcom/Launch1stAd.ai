export function AuthMessage({ message }: { message: string }) {
  if (!message) return null;
  return <p className="mt-4 text-sm font-semibold text-coral">{message}</p>;
}
