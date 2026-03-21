import level01 from "@/data/level_01.json";
import level02 from "@/data/level_02.json";
import type { LevelData } from "@/types/level";

const BY_JOURNEY_LEVEL: Record<number, LevelData> = {
  1: level01 as LevelData,
  2: level02 as LevelData,
};

export function getLevelDataForJourneyLevel(
  journeyLevel: number,
): LevelData | null {
  return BY_JOURNEY_LEVEL[journeyLevel] ?? null;
}

/** localStorage key for current slide index within a level pack */
export function slideIndexStorageKey(levelId: string) {
  return `gf_${levelId}_slide_index`;
}
