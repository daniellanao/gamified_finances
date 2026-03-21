"use client";

import {
  JOURNEY_MAX_LEVEL,
  useJourneyProgress,
} from "@/hooks/useJourneyProgress";

const sans = { fontFamily: "var(--font-geist-sans), system-ui, sans-serif" } as const;

export function JourneySidebar() {
  const { level, coins, ready } = useJourneyProgress();

  return (
    <aside
      className="sticky top-20 w-full shrink-0 rounded-sm border-[3px] border-[var(--pf-navy)] bg-[var(--pf-bg-secondary)] p-4 shadow-[4px_4px_0_0_var(--pf-gold)] lg:max-w-sm"
      aria-label="Journey progress"
    >
      <h2
        className="border-b-2 border-[var(--pf-navy)]/15 pb-2 text-xs font-semibold uppercase tracking-wider text-[var(--pf-navy)]"
        style={sans}
      >
        Your progress
      </h2>

      <dl className="mt-4 space-y-5">
        <div>
          <dt className="text-xs text-[var(--pf-slate)]" style={sans}>
            Current level
          </dt>
          <dd className="mt-1 flex flex-wrap items-baseline gap-2">
            <span
              className="text-3xl font-bold tabular-nums text-[var(--pf-soft-blue)]"
              style={sans}
            >
              {ready ? level : "—"}
            </span>
            <span
              className="text-sm text-[var(--pf-slate)]"
              style={sans}
            >
              / {JOURNEY_MAX_LEVEL}
            </span>
          </dd>
        </div>

        <div>
          <dt className="text-xs text-[var(--pf-slate)]" style={sans}>
            Coins earned
          </dt>
          <dd className="mt-1 flex items-center gap-2">
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--pf-navy)] bg-[var(--pf-gold)] text-sm font-bold text-[var(--pf-navy)] shadow-[2px_2px_0_0_var(--pf-navy)]"
            >
              ◎
            </span>
            <span
              className="text-3xl font-bold tabular-nums text-[var(--pf-navy)]"
              style={sans}
            >
              {ready ? coins.toLocaleString() : "—"}
            </span>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
