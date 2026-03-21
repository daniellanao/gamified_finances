"use client";

import { useCallback, useEffect, useState } from "react";

export const JOURNEY_MAX_LEVEL = 5;

const KEY_LEVEL = "gf_journey_level";
const KEY_COINS = "gf_coins";

/** Same-tab sync (storage event only fires across tabs) */
export const JOURNEY_PROGRESS_SYNC = "gf-journey-progress-sync";

function clampLevel(n: number) {
  if (!Number.isFinite(n)) return 1;
  return Math.min(JOURNEY_MAX_LEVEL, Math.max(1, Math.floor(n)));
}

function clampCoins(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.floor(n));
}

export function useJourneyProgress() {
  const [level, setLevelState] = useState(1);
  const [coins, setCoinsState] = useState(0);
  const [ready, setReady] = useState(false);

  const syncFromStorage = useCallback(() => {
    const rawL = localStorage.getItem(KEY_LEVEL);
    const rawC = localStorage.getItem(KEY_COINS);
    const l = rawL != null ? parseInt(rawL, 10) : 1;
    const c = rawC != null ? parseInt(rawC, 10) : 0;
    setLevelState(clampLevel(l));
    setCoinsState(clampCoins(c));
  }, []);

  useEffect(() => {
    syncFromStorage();
    setReady(true);
  }, [syncFromStorage]);

  useEffect(() => {
    const onSync = () => syncFromStorage();
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY_LEVEL || e.key === KEY_COINS) syncFromStorage();
    };
    window.addEventListener(JOURNEY_PROGRESS_SYNC, onSync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(JOURNEY_PROGRESS_SYNC, onSync);
      window.removeEventListener("storage", onStorage);
    };
  }, [syncFromStorage]);

  const setLevel = useCallback((next: number) => {
    const v = clampLevel(next);
    setLevelState(v);
    localStorage.setItem(KEY_LEVEL, String(v));
    window.dispatchEvent(new Event(JOURNEY_PROGRESS_SYNC));
  }, []);

  const setCoins = useCallback((next: number) => {
    const v = clampCoins(next);
    setCoinsState(v);
    localStorage.setItem(KEY_COINS, String(v));
    window.dispatchEvent(new Event(JOURNEY_PROGRESS_SYNC));
  }, []);

  const addCoins = useCallback((delta: number) => {
    setCoinsState((prev) => {
      const v = clampCoins(prev + delta);
      localStorage.setItem(KEY_COINS, String(v));
      window.dispatchEvent(new Event(JOURNEY_PROGRESS_SYNC));
      return v;
    });
  }, []);

  return {
    level,
    coins,
    ready,
    setLevel,
    setCoins,
    addCoins,
  };
}
