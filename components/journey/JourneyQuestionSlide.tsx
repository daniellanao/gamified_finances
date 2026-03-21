"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { JourneySlideFooter } from "@/components/journey/JourneySlideFooter";
import { journeySans } from "@/components/journey/journey-ui";
import type { QuestionSlide } from "@/types/level";

type Props = {
  slide: QuestionSlide;
  coinsReward: number;
  isLastSlide: boolean;
  onBack: () => void;
  onNext: () => void;
  onCorrect: () => void;
  canGoBack: boolean;
  canAdvanceJourney: boolean;
  onCompleteJourneyLevel: () => void;
};

export function JourneyQuestionSlide({
  slide,
  coinsReward,
  isLastSlide,
  onBack,
  onNext,
  onCorrect,
  canGoBack,
  canAdvanceJourney,
  onCompleteJourneyLevel,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
  }, [slide.slide_id]);

  const isCorrect = selected === slide.correct_answer;

  function handleCheck() {
    if (selected == null) return;
    setSubmitted(true);
    if (selected === slide.correct_answer) {
      onCorrect();
    }
  }

  return (
    <>
      <section className="space-y-4">
        <h2
          className="text-lg font-semibold text-[var(--pf-text)] sm:text-xl"
          style={journeySans}
        >
          {slide.title}
        </h2>
        <p className="text-base text-[var(--pf-text)]" style={journeySans}>
          {slide.question}
        </p>
        <ul className="space-y-2">
          {slide.options.map((opt, i) => (
            <li key={i}>
              <label
                className={`flex cursor-pointer gap-3 rounded border-2 px-3 py-2.5 transition-colors ${
                  submitted && i === slide.correct_answer
                    ? "border-[var(--pf-soft-blue)] bg-[var(--pf-soft-blue)]/10"
                    : submitted && selected === i && i !== slide.correct_answer
                      ? "border-[var(--pf-orange)]/60 bg-[var(--pf-orange)]/5"
                      : "border-[var(--pf-navy)]/20 hover:border-[var(--pf-navy)]/40"
                } ${submitted ? "cursor-default" : ""}`}
                style={journeySans}
              >
                <input
                  type="radio"
                  name={`q-${slide.slide_id}`}
                  className="mt-1"
                  checked={selected === i}
                  onChange={() => !submitted && setSelected(i)}
                  disabled={submitted}
                />
                <span>{opt}</span>
              </label>
            </li>
          ))}
        </ul>

        {submitted ? (
          <div
            className="rounded border border-[var(--pf-navy)]/20 bg-[var(--pf-bg-secondary)] p-4 text-sm text-[var(--pf-text)]"
            style={journeySans}
          >
            <p className="font-medium text-[var(--pf-navy)]">
              {isCorrect
                ? `Correct! +${coinsReward} coins`
                : "Not quite — here is why:"}
            </p>
            <p className="mt-2 text-[var(--pf-slate)]">{slide.explanation}</p>
          </div>
        ) : null}
      </section>

      <JourneySlideFooter canGoBack={canGoBack} onBack={onBack}>
        {!submitted ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={selected == null}
            className="btn-primary"
            style={journeySans}
          >
            Check answer
          </button>
        ) : isLastSlide ? (
          <div className="flex flex-col items-end gap-2">
            <p
              className="text-sm font-semibold text-[var(--pf-navy)]"
              style={journeySans}
            >
              Level complete!
            </p>
            {canAdvanceJourney ? (
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
              <p className="text-xs text-[var(--pf-slate)]" style={journeySans}>
                End of journey
              </p>
            )}
          </div>
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
