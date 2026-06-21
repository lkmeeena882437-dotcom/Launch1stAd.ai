import { AuthCallback } from "@/components/auth/AuthCallback";

export default function SessionPage() {
  return (
    <main className="min-h-screen bg-canvas p-8 text-ink">
      <section className="mx-auto max-w-3xl py-10">
        <AuthCallback />
      </section>
    </main>
  );
}
