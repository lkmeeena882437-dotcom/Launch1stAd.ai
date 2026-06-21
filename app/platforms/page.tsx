import { Brand } from "@/components/Brand";
import { BrandLinksForm } from "@/components/platforms/BrandLinksForm";

export default function PlatformsPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas px-5 py-4">
        <div className="mx-auto max-w-7xl">
          <Brand />
        </div>
      </header>
      <BrandLinksForm />
    </main>
  );
}
