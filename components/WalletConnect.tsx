"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const navButtonClass =
  "inline-block shrink-0 rounded-sm border-2 border-[var(--pf-navy)] bg-[var(--pf-gold)] px-4 py-2 text-sm font-semibold leading-none text-[var(--pf-navy)] shadow-[3px_3px_0_0_var(--pf-navy)] transition-colors hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pf-gold)] sm:px-5 sm:text-[0.9375rem]";

const heroButtonClass =
  "inline-flex items-center justify-center rounded-sm border-[3px] border-[var(--pf-navy)] bg-[var(--pf-gold)] px-8 py-3.5 text-base font-semibold text-[var(--pf-navy)] shadow-[4px_4px_0_0_var(--pf-navy)] transition-colors hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pf-gold)] sm:px-10 sm:py-4 sm:text-lg";

/** Demo-only default so the field is pre-filled; user can edit or submit as-is */
const DEFAULT_FAKE_WALLET =
  "0x842d35Cc6634C0532925a3b844Bc9e7595f0bEb";

export type WalletConnectContextValue = {
  open: () => void;
  connected: boolean;
  disconnect: () => void;
  address: string;
};

const WalletConnectContext = createContext<WalletConnectContextValue | null>(
  null,
);

export function useWallet() {
  const ctx = useContext(WalletConnectContext);
  if (!ctx) {
    throw new Error("useWallet must be used within WalletConnectProvider");
  }
  return ctx;
}

export function shortenAddress(addr: string) {
  const t = addr.trim();
  if (t.length < 12) return t;
  return `${t.slice(0, 6)}…${t.slice(-4)}`;
}

export function WalletConnectProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(DEFAULT_FAKE_WALLET);
  const titleId = useId();

  const openModal = useCallback(() => setModalOpen(true), []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setAddress(DEFAULT_FAKE_WALLET);
  }, []);

  const value = useMemo(
    () => ({
      open: openModal,
      connected,
      disconnect,
      address,
    }),
    [openModal, connected, disconnect, address],
  );

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  function handleFakeConnect() {
    setConnected(true);
    setModalOpen(false);
    router.push("/journey");
  }

  return (
    <WalletConnectContext.Provider value={value}>
      {children}
      {modalOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="presentation"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--pf-navy) 72%, transparent)",
            }}
            aria-hidden
            onClick={() => setModalOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-md border-[3px] border-[var(--pf-navy)] bg-[var(--pf-bg)] p-5 shadow-[6px_6px_0_0_var(--pf-soft-blue)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id={titleId}
              className="text-base font-semibold text-[var(--pf-navy)] sm:text-lg"
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              }}
            >
              Connect wallet
            </h2>
            <p
              className="mt-2 text-sm leading-relaxed text-[var(--pf-slate)]"
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              }}
            >
              Demo only—paste a fake wallet address. No chain or keys are used.
            </p>

            <label
              htmlFor="fake-wallet"
              className="mt-4 block text-xs font-medium uppercase tracking-wide text-[var(--pf-text)]"
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              }}
            >
              Wallet address
            </label>
            <input
              id="fake-wallet"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x0000000000000000000000000000000000000000"
              autoComplete="off"
              className="mt-2 w-full border-[3px] border-[var(--pf-navy)] bg-[var(--pf-bg-secondary)] px-3 py-2.5 text-sm text-[var(--pf-text)] placeholder:text-[var(--pf-slate)]/70 focus:border-[var(--pf-soft-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--pf-soft-blue)]/40"
              style={{
                fontFamily: "ui-monospace, monospace",
              }}
            />

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  setAddress(DEFAULT_FAKE_WALLET);
                }}
                className="border-2 border-[var(--pf-slate)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--pf-text)] transition-colors hover:bg-[var(--pf-bg-secondary)]"
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFakeConnect}
                className="border-2 border-[var(--pf-navy)] bg-[var(--pf-gold)] px-4 py-2 text-sm font-semibold text-[var(--pf-navy)] shadow-[3px_3px_0_0_var(--pf-navy)] transition-colors hover:brightness-105"
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </WalletConnectContext.Provider>
  );
}

type WalletConnectButtonProps = {
  variant?: "nav" | "hero";
  className?: string;
};

export function WalletConnectButton({
  variant = "nav",
  className,
}: WalletConnectButtonProps) {
  const { open, connected } = useWallet();
  const merged =
    className ??
    (variant === "hero" ? heroButtonClass : navButtonClass);

  if (connected) {
    return null;
  }

  return (
    <button type="button" className={merged} onClick={open}>
      Connect wallet
    </button>
  );
}
