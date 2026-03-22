import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Press_Start_2P } from "next/font/google";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const sans = { fontFamily: "var(--font-geist-sans), system-ui, sans-serif" } as const;

/** Theory art from journey levels — paths under /public */
const LEVEL_BG = [
  "/gamified_finances_bg2.png",
  "/level_01/budget_control.png",
  "/level_01/lifestyle_inflation.png",
  "/level_01/budget_strategy.png",
  "/level_02/debt_trap_intro.png",
  "/level_02/minimum_payment_illusion.png",
  "/level_02/debt_priority_strategy.png",
] as const;

export const metadata: Metadata = {
  title: "Pitch",
  robots: { index: false, follow: false },
};

export default function PitchPage() {
  return (
    <>
      <PitchSection
        pixelClass={pixel.className}
        imageSrc={LEVEL_BG[0]}
        priority
        title="GAMIFIED FINANCES"
        subtitle="Here Daniel"
      >
       
      </PitchSection>

      <PitchSection pixelClass={pixel.className} imageSrc={LEVEL_BG[1]} title="" subtitle="I wish someone had taught me about money education when I was younger">
        
      </PitchSection>

      <PitchSection
        pixelClass={pixel.className}
        imageSrc={LEVEL_BG[2]}
        title="AI ERA"
        subtitle="Learning is easier than ever"
      >
        <p
          className={`${pixel.className} mt-4 text-xl text-[var(--pf-gold)] drop-shadow-[0_2px_0_var(--pf-navy)]`}
          style={{ fontFamily: pixel.style?.fontFamily }}
        >
          Information overload
        </p>

        <p
          className={`${pixel.className} mt-4 text-xl text-[var(--pf-gold)] drop-shadow-[0_2px_0_var(--pf-navy)]`}
          style={{ fontFamily: pixel.style?.fontFamily }}
        >
          The real challenge today is no longer <em>what to learn</em>, but{" "}
          <em>how to learn</em>.
        </p>
      </PitchSection>

      <PitchSection
        pixelClass={pixel.className}
        imageSrc={LEVEL_BG[3]}
        title="GAMIFIED FINANCES"
        subtitle="Platform to educate and gamify financial education"
      >
        
      </PitchSection>


      <PitchSection
        pixelClass={pixel.className}
        imageSrc={LEVEL_BG[4]}
        title="Subjects Covered"
        subtitle=" Budgeting, investing, Risk management or financial planning"
      >
        
      </PitchSection>

      <PitchSection
        pixelClass={pixel.className}
        imageSrc={LEVEL_BG[5]}
        title="GO DEMO!"
        subtitle=""
      >
        
      </PitchSection>

      

     
    </>
  );
}

function PitchSection({
  pixelClass,
  imageSrc,
  title,
  subtitle,
  priority,
  compact,
  children,
}: {
  pixelClass: string;
  imageSrc: string;
  title: string;
  subtitle?: string;
  priority?: boolean;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`relative flex w-full flex-col justify-center overflow-hidden border-b border-[var(--pf-navy)]/30 ${
        compact ? "min-h-[55vh] py-16 sm:min-h-[45vh]" : "min-h-[88vh] py-16 sm:py-20"
      }`}
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        priority={priority}
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, color-mix(in srgb, var(--pf-navy) 88%, transparent) 0%, color-mix(in srgb, var(--pf-navy) 72%, transparent) 50%, color-mix(in srgb, var(--pf-navy) 85%, transparent) 100%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 sm:px-6">
        <header>
          <h2
            className={`${pixelClass} text-balance text-2xl leading-tight tracking-wide text-[var(--pf-bg)] drop-shadow-[0_3px_0_var(--pf-navy)] sm:text-3xl md:text-4xl lg:text-5xl`}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              className={`${pixelClass} mt-3 text-balance text-lg leading-snug tracking-wide text-[var(--pf-gold)] drop-shadow-[0_2px_0_var(--pf-navy)] sm:text-xl md:text-2xl`}
            >
              {subtitle}
            </p>
          ) : null}
        </header>
        <div
          className="max-w-2xl space-y-4 text-base leading-relaxed text-white/95 sm:text-lg"
          style={sans}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
