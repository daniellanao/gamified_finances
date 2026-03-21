/** Demo leaderboard — replace with API / on-chain data later */
export type RankingEntry = {
  nickname: string;
  /** Full 0x + 40 hex chars */
  wallet: string;
  level: number;
  coins: number;
};

export function formatWalletDisplay(addr: string) {
  if (addr.length < 12) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

/** Deterministic dummy address (0x + 40 hex) from row index */
function dummyWallet(index: number): string {
  const prefix = index.toString(16).padStart(2, "0");
  const body = "ab".repeat(19);
  return `0x${prefix}${body}`;
}

const ROWS: Omit<RankingEntry, "wallet">[] = [
  { nickname: "ITZIMI", level: 5, coins: 612 },
  { nickname: "VaultViper", level: 5, coins: 548 },
  { nickname: "PixelHodler", level: 4, coins: 412 },
  { nickname: "BudgetBadger", level: 4, coins: 388 },
  { nickname: "CoinWeaver", level: 4, coins: 365 },
  { nickname: "SaveQueen", level: 3, coins: 298 },
  { nickname: "DebtSlayer_01", level: 3, coins: 271 },
  { nickname: "SatStacker", level: 3, coins: 244 },
  { nickname: "YieldYak", level: 3, coins: 218 },
  { nickname: "FrugalFox", level: 2, coins: 186 },
  { nickname: "MoonMango", level: 2, coins: 162 },
  { nickname: "GasGhost", level: 2, coins: 139 },
  { nickname: "LedgerLynx", level: 2, coins: 127 },
  { nickname: "RainyDayRay", level: 1, coins: 98 },
  { nickname: "MintyFresh", level: 1, coins: 86 },
  { nickname: "BlockBuddy", level: 1, coins: 74 },
  { nickname: "PaperHandsPete", level: 1, coins: 68 },
  { nickname: "DustDevil", level: 1, coins: 62 },
  { nickname: "RookieRae", level: 1, coins: 60 },
  { nickname: "TutorialTom", level: 1, coins: 60 },
];

/** 20 rows, sorted by coins descending. ITZIMI is #1. Coins scale with level (≥60 per tier). */
export const RANKING_LEADERBOARD: RankingEntry[] = ROWS.map((row, i) => ({
  ...row,
  wallet: dummyWallet(i),
}));
