"use client";

import { useCallback } from "react";

import { JourneyLevelHeader } from "@/components/journey/JourneyLevelHeader";
import { JourneyQuestionSlide } from "@/components/journey/JourneyQuestionSlide";
import { JourneyTheorySlide } from "@/components/journey/JourneyTheorySlide";
import { journeySans } from "@/components/journey/journey-ui";
import {
  JOURNEY_MAX_LEVEL,
  useJourneyProgress,
} from "@/hooks/useJourneyProgress";
import { useLevelSlideIndex } from "@/hooks/useLevelSlideIndex";
import {
  getLevelDataForJourneyLevel,
  slideIndexStorageKey,
} from "@/lib/journey-level-data";
import type { LevelSlide } from "@/types/level";

const NO_PACK_KEY = "__gf_journey_no_pack__";

export function JourneyLevelSlide() {
  const { level: journeyLevel, coins, ready, addCoins, setLevel } =
    useJourneyProgress();

  const canAdvanceJourney = journeyLevel < JOURNEY_MAX_LEVEL;

  const levelPack = getLevelDataForJourneyLevel(journeyLevel);
  const totalSlides = levelPack?.slides.length ?? 0;
  const storageKey = levelPack
    ? slideIndexStorageKey(levelPack.level_id)
    : NO_PACK_KEY;

  const {
    slideIndex,
    ready: indexReady,
    goNext,
    goBack,
    canGoBack,
    isLastSlide,
  } = useLevelSlideIndex(storageKey, totalSlides > 0 ? totalSlides : 1);

  const coinsReward = levelPack?.coins_per_correct ?? 10;

  const onQuestionCorrect = useCallback(() => {
    addCoins(coinsReward);
  }, [addCoins, coinsReward]);

  const onCompleteJourneyLevel = useCallback(() => {
    if (!canAdvanceJourney) return;
    setLevel(journeyLevel + 1);
  }, [canAdvanceJourney, journeyLevel, setLevel]);

  if (!levelPack) {
    return (
      <p className="text-sm text-[var(--pf-slate)]" style={journeySans}>
        No level content for journey stage {journeyLevel} yet.
      </p>
    );
  }

  if (totalSlides === 0) {
    return (
      <p className="text-sm text-[var(--pf-slate)]" style={journeySans}>
        This level has no slides.
      </p>
    );
  }

  if (!indexReady) {
    return (
      <p className="text-sm text-[var(--pf-slate)]" style={journeySans}>
        Loading…
      </p>
    );
  }

  const slide: LevelSlide = levelPack.slides[slideIndex];

  return (
    <article className="space-y-6">
      <JourneyLevelHeader
        packJourneyLevel={levelPack.journey_level}
        savedJourneyLevel={journeyLevel}
        coins={coins}
        progressReady={ready}
        slideIndex={slideIndex}
        totalSlides={totalSlides}
        title={levelPack.title}
        description={levelPack.description}
      />

      {slide.type === "theory" ? (
        <JourneyTheorySlide
          slide={slide}
          onBack={goBack}
          onNext={goNext}
          canGoBack={canGoBack}
          isLastSlide={isLastSlide}
          canAdvanceJourney={canAdvanceJourney}
          onCompleteJourneyLevel={onCompleteJourneyLevel}
        />
      ) : (
        <JourneyQuestionSlide
          slide={slide}
          coinsReward={coinsReward}
          isLastSlide={isLastSlide}
          onBack={goBack}
          onNext={goNext}
          onCorrect={onQuestionCorrect}
          canGoBack={canGoBack}
          canAdvanceJourney={canAdvanceJourney}
          onCompleteJourneyLevel={onCompleteJourneyLevel}
        />
      )}
    </article>
  );
}
