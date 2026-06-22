import { Brand } from "@/components/Brand";
import { RealLaunchRoadmap } from "@/components/launch/RealLaunchRoadmap";

export default function LaunchPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas px-5 py-4">
        <div className="mx-auto max-w-7xl">
          <Brand />
        </div>
      </header>
      <RealLaunchRoadmap />
    </main>
  );
}
