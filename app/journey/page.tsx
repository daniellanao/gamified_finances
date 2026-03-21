import { JourneyLevelSlide } from "@/components/journey/JourneyLevelSlide";
import { JourneySidebar } from "@/components/journey/JourneySidebar";

export default function JourneyPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 lg:flex-row lg:gap-8 lg:px-6 lg:py-10">
      <main className="min-w-0 flex-1">
        <JourneyLevelSlide />
      </main>

      <div className="w-full shrink-0 lg:order-none lg:w-72 lg:max-w-sm">
        <JourneySidebar />
      </div>
    </div>
  );
}
