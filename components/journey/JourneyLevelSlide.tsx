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
import { useLevelData } from "@/hooks/useLevelData";
import {
  slideIndexStorageKey,
} from "@/lib/journey-level-data";
import type { LevelSlide } from "@/types/level";

const NO_PACK_KEY = "__gf_journey_no_pack__";

export function JourneyLevelSlide() {
  const { 
    level: journeyLevel, 
    coins, 
    ready: progressReady, 
    completeLevelOnChain,
    isTxPending 
  } = useJourneyProgress();

  const { levelPack, loading: levelLoading, error: levelError } = useLevelData(journeyLevel);

  const canAdvanceJourney = journeyLevel < JOURNEY_MAX_LEVEL;

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
    // addCoins(coinsReward); // No longer needed as we'll reward total coins on-chain at the end
  }, []);

  const onCompleteJourneyLevel = useCallback(() => {
    if (!canAdvanceJourney || isTxPending) return;
    // Calculate total coins earned in this level to send on-chain
    // For now, let's just send the standard level reward
    completeLevelOnChain(journeyLevel + 1, coinsReward * totalSlides);
  }, [canAdvanceJourney, isTxPending, journeyLevel, completeLevelOnChain, coinsReward, totalSlides]);

  if (levelLoading) {
    return (
      <p className="text-sm text-[var(--pf-slate)]" style={journeySans}>
        Fetching level {journeyLevel}...
      </p>
    );
  }

  if (levelError || !levelPack) {
    return (
      <p className="text-sm text-red-500" style={journeySans}>
        {levelError || `No level content for journey stage ${journeyLevel} yet.`}
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
        Loading slides…
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
        progressReady={progressReady}
        slideIndex={slideIndex}
        totalSlides={totalSlides}
        title={levelPack.title}
        description={levelPack.description}
      />

      {isTxPending && (
        <div className="rounded-sm border-2 border-blue-400 bg-blue-50 p-4 text-sm text-blue-700">
          Syncing progress... Please wait.
        </div>
      )}

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

