import { journeySans } from "@/components/journey/journey-ui";

type Props = {
  packJourneyLevel: number;
  savedJourneyLevel: number;
  coins: number;
  progressReady: boolean;
  slideIndex: number;
  totalSlides: number;
  title: string;
  description?: string;
};

export function JourneyLevelHeader({
  packJourneyLevel,
  savedJourneyLevel,
  coins,
  progressReady,
  slideIndex,
  totalSlides,
  title,
  description,
}: Props) {
  return (
    <header className="space-y-3 border-b-2 border-[var(--pf-navy)]/10 pb-2">
      <div
        className="flex flex-wrap items-baseline justify-between gap-2 gap-y-1 text-xs text-[var(--pf-slate)]"
        style={journeySans}
      >
        <p className="font-medium uppercase tracking-[0.15em]">
          Journey level {packJourneyLevel}
          {progressReady ? (
            <span className="ml-2 font-normal normal-case tracking-normal text-[var(--pf-text)]">
              · Saved: L{savedJourneyLevel}
              <span className="text-[var(--pf-gold)]">
                {" "}
                · {coins.toLocaleString()} coins
              </span>
            </span>
          ) : null}
        </p>
        <p className="tabular-nums">
          Slide {slideIndex + 1} / {totalSlides}
        </p>
      </div>
      <h1
        className="text-xl font-bold leading-tight text-[var(--pf-navy)] sm:text-2xl"
        style={journeySans}
      >
        {title}
      </h1>
      {description ? (
        <p
          className="text-sm leading-relaxed text-[var(--pf-slate)]"
          style={journeySans}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
