"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import { JourneySlideFooter } from "@/components/journey/JourneySlideFooter";
import { journeySans } from "@/components/journey/journey-ui";
import type { TheorySlide } from "@/types/level";

type Props = {
  slide: TheorySlide;
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  isLastSlide: boolean;
  /** True if journey stage can still increase (below max level) */
  canAdvanceJourney: boolean;
  onCompleteJourneyLevel: () => void;
};

export function JourneyTheorySlide({
  slide,
  onBack,
  onNext,
  canGoBack,
  isLastSlide,
  canAdvanceJourney,
  onCompleteJourneyLevel,
}: Props) {
  return (
    <>
      <section className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
          <div className="min-w-0 flex-1 basis-0">
            <h2
              className="text-lg font-semibold text-[var(--pf-text)] sm:text-xl"
              style={journeySans}
            >
              {slide.title}
            </h2>
            <p
              className="mt-4 text-base leading-relaxed text-[var(--pf-text)]"
              style={journeySans}
            >
              {slide.content}
            </p>
          </div>
          <div className="flex flex-1 basis-0 items-start justify-center">
            <div className="w-full max-w-md">
              <Image
                src={`/${slide.image}`}
                alt=""
                width={800}
                height={450}
                className="h-auto w-full rounded shadow"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <JourneySlideFooter canGoBack={canGoBack} onBack={onBack}>
        {isLastSlide ? (
          canAdvanceJourney ? (
            <button
              type="button"
              onClick={onCompleteJourneyLevel}
              className="btn-primary"
              style={journeySans}
            >
              Next level
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" aria-hidden />
            </button>
          ) : (
            <p className="text-sm font-medium text-[var(--pf-slate)]" style={journeySans}>
              End of journey
            </p>
          )
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="btn-primary"
            style={journeySans}
          >
            Next
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" aria-hidden />
          </button>
        )}
      </JourneySlideFooter>
    </>
  );
}
