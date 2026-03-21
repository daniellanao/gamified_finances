import {
  formatWalletDisplay,
  RANKING_LEADERBOARD,
} from "@/data/ranking";

import type { Metadata } from "next";

const sans = { fontFamily: "var(--font-geist-sans), system-ui, sans-serif" } as const;

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "See how wallets stack up by coins earned and journey level in this demo leaderboard.",
  openGraph: {
    title: "Leaderboard · Gamified Finances",
    description:
      "Wallet rankings by coins earned in the journey and current level.",
    url: "/ranking",
  },
  twitter: {
    title: "Leaderboard · Gamified Finances",
    description:
      "Wallet rankings by coins earned in the journey and current level.",
  },
  alternates: { canonical: "/ranking" },
};

export default function RankingPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-[var(--pf-navy)] sm:text-3xl"
          style={sans}
        >
          Leaderboard
        </h1>
        <p className="mt-2 text-sm text-[var(--pf-slate)]" style={sans}>
          Wallets ranked by coins earned in the journey.
        </p>
      </div>

      <div className="overflow-x-auto rounded-sm border-[3px] border-[var(--pf-navy)] bg-[var(--pf-bg)] shadow-[4px_4px_0_0_var(--pf-gold)]">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-[var(--pf-navy)] bg-[var(--pf-bg-secondary)]">
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-[var(--pf-navy)]"
                style={sans}
              >
                #
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-[var(--pf-navy)]"
                style={sans}
              >
                Nickname
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-[var(--pf-navy)]"
                style={sans}
              >
                Wallet
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-[var(--pf-navy)]"
                style={sans}
              >
                Level
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right font-semibold text-[var(--pf-navy)]"
                style={sans}
              >
                Coins
              </th>
            </tr>
          </thead>
          <tbody>
            {RANKING_LEADERBOARD.map((row, i) => (
              <tr
                key={row.wallet}
                className={`border-b border-[var(--pf-navy)]/10 ${
                  row.nickname === "ITZIMI"
                    ? "bg-[var(--pf-gold)]/15"
                    : i % 2 === 1
                      ? "bg-[var(--pf-bg-secondary)]/50"
                      : ""
                }`}
              >
                <td className="px-4 py-3 tabular-nums text-[var(--pf-slate)]" style={sans}>
                  {i + 1}
                </td>
                <td
                  className={`px-4 py-3 font-medium ${
                    row.nickname === "ITZIMI"
                      ? "text-[var(--pf-navy)]"
                      : "text-[var(--pf-text)]"
                  }`}
                  style={sans}
                >
                  {row.nickname}
                  {row.nickname === "ITZIMI" ? (
                    <span className="ml-2 text-xs font-normal text-[var(--pf-orange)]">
                      (top)
                    </span>
                  ) : null}
                </td>
                <td
                  className="max-w-[200px] truncate px-4 py-3 font-mono text-xs text-[var(--pf-slate)] sm:max-w-none"
                  title={row.wallet}
                >
                  {formatWalletDisplay(row.wallet)}
                </td>
                <td className="px-4 py-3 tabular-nums text-[var(--pf-text)]" style={sans}>
                  {row.level}
                </td>
                <td
                  className="px-4 py-3 text-right font-semibold tabular-nums text-[var(--pf-gold)]"
                  style={sans}
                >
                  {row.coins.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
