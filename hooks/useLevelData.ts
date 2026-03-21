"use client";

import { useState, useEffect } from "react";
import { getLevelDataForJourneyLevel } from "@/lib/journey-level-data";
import type { LevelData } from "@/types/level";

export function useLevelData(journeyLevel: number) {
  const [levelPack, setLevelPack] = useState<LevelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getLevelDataForJourneyLevel(journeyLevel)
      .then((data) => {
        if (!active) return;
        setLevelPack(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        console.error(err);
        setError("Failed to load level content from IPFS.");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [journeyLevel]);

  return { levelPack, loading, error };
}
