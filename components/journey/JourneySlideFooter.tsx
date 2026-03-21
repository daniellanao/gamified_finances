"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";

import { journeySans } from "@/components/journey/journey-ui";

type Props = {
  canGoBack: boolean;
  onBack: () => void;
  children: ReactNode;
};

export function JourneySlideFooter({ canGoBack, onBack, children }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        className="btn-back"
        style={journeySans}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" aria-hidden />
        Back
      </button>
      <div className="flex flex-wrap justify-end gap-2">{children}</div>
    </div>
  );
}
