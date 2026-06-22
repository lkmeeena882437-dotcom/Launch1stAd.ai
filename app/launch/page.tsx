import { Brand } from "@/components/Brand";
import { RealLaunchRoadmap } from "@/components/launch/RealLaunchRoadmap";
import { TodayRunSetup } from "@/components/launch/TodayRunSetup";

export default function LaunchPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-hairline bg-canvas px-5 py-4">
        <div className="mx-auto max-w-7xl">
          <Brand />
        </div>
      </header>
      <RealLaunchRoadmap />
      <TodayRunSetup />
    </main>
  );
}
