"use client";

import { useCallback, useEffect, useState } from "react";

function clampSlideIndex(i: number, total: number) {
  if (!Number.isFinite(i)) return 0;
  return Math.min(Math.max(0, Math.floor(i)), Math.max(0, total - 1));
}

export function useLevelSlideIndex(storageKey: string, totalSlides: number) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw != null ? parseInt(raw, 10) : 0;
    setSlideIndex(clampSlideIndex(parsed, totalSlides));
    setReady(true);
  }, [storageKey, totalSlides]);

  const persistIndex = useCallback(
    (i: number) => {
      const v = clampSlideIndex(i, totalSlides);
      localStorage.setItem(storageKey, String(v));
      setSlideIndex(v);
    },
    [storageKey, totalSlides],
  );

  const goNext = useCallback(() => {
    if (slideIndex >= totalSlides - 1) return;
    persistIndex(slideIndex + 1);
  }, [persistIndex, slideIndex, totalSlides]);

  const goBack = useCallback(() => {
    if (slideIndex <= 0) return;
    persistIndex(slideIndex - 1);
  }, [persistIndex, slideIndex]);

  const canGoBack = slideIndex > 0;

  return {
    slideIndex,
    ready,
    goNext,
    goBack,
    canGoBack,
    isLastSlide: slideIndex >= totalSlides - 1,
  };
}
