import type { Metadata } from "next";

import { JourneyLevelSlide } from "@/components/journey/JourneyLevelSlide";
import { JourneySidebar } from "@/components/journey/JourneySidebar";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "Play through financial lessons level by level: theory, practice questions, and coins as you advance your money skills.",
  openGraph: {
    title: `Journey · ${SITE_NAME}`,
    description:
      "Levels, quizzes, and rewards as you learn budgeting, saving, and more.",
    url: "/journey",
  },
  twitter: {
    title: `Journey · ${SITE_NAME}`,
    description:
      "Levels, quizzes, and rewards as you learn budgeting, saving, and more.",
  },
  alternates: { canonical: "/journey" },
};

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
