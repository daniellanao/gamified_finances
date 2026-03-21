import Image from "next/image";

import { WalletConnectButton } from "@/components/WalletConnect";

export function Hero() {
  return (
    <section className="relative flex min-h-[min(100dvh,56rem)] w-full flex-1 flex-col overflow-hidden">
      <Image
        src="/gamified_finances_bg2.png"
        alt=""
        fill
        priority
        className="object-cover object-[center_30%] sm:object-center"
        sizes="100vw"
      />
      {/* Readability over busy pixel art: stronger wash on the left where copy sits */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, color-mix(in srgb, var(--pf-navy) 88%, transparent), color-mix(in srgb, var(--pf-navy) 42%, transparent), transparent)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/90 sm:text-xs">
            Level up your financial Education
          </p>
          <h1 className="max-w-xl text-xl leading-snug text-[var(--pf-bg)] drop-shadow-[0_2px_0_var(--pf-navy)] sm:max-w-2xl sm:text-3xl md:text-4xl">
            Gamified Finances
          </h1>
          <p
            className="max-w-xl text-xs leading-relaxed text-white/95 sm:max-w-2xl sm:text-sm md:text-base"
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            Turn budgets, savings, and goals into a playful journey. Earn rewards,
            climb the ranking, and follow your path—one quest at a time.
          </p>

          <div className="pt-2">
            <WalletConnectButton variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
