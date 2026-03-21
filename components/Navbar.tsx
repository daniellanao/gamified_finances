"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Press_Start_2P } from "next/font/google";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  shortenAddress,
  useWallet,
  WalletConnectButton,
} from "@/components/WalletConnect";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const publicNavLinks = [
  { label: "Home", href: "/" },
  { label: "Ranking", href: "/ranking" },
] as const;

const journeyLink = { label: "Journey", href: "/journey" } as const;

function NavbarWalletDropdown({ fullWidth = false }: { fullWidth?: boolean }) {
  const { address, disconnect } = useWallet();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, close]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [menuOpen]);

  function handleDisconnect() {
    disconnect();
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <div
      className={fullWidth ? "relative w-full" : "relative shrink-0"}
      ref={wrapRef}
    >
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        className={`${pixel.className} truncate border-[3px] border-[var(--pf-orange)] bg-[var(--pf-navy)] px-2.5 py-2 text-left text-[9px] uppercase leading-tight tracking-tight text-[var(--pf-orange)] shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pf-orange)] sm:px-3 sm:text-[10px] ${fullWidth ? "w-full text-center" : "min-w-0 max-w-[14rem] sm:max-w-[16rem]"}`}
        title={address}
      >
        {shortenAddress(address)}
      </button>
      {menuOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Wallet menu"
          className={`absolute top-full z-[70] mt-1.5 border-[3px] border-[var(--pf-navy)] bg-[var(--pf-bg)] py-1 shadow-[4px_4px_0_0_var(--pf-soft-blue)] ${
            fullWidth ? "left-0 right-0 w-full" : "right-0 min-w-[11rem]"
          }`}
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleDisconnect}
            className="w-full px-3 py-2.5 text-left text-sm font-medium text-[var(--pf-text)] transition-colors hover:bg-[var(--pf-bg-secondary)]"
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            Disconnect
          </button>
        </div>
      ) : null}
    </div>
  );
}

const mobileConnectClass =
  "w-full justify-center border-2 border-[var(--pf-navy)] bg-[var(--pf-gold)] px-4 py-3 text-sm font-semibold text-[var(--pf-navy)] shadow-[3px_3px_0_0_var(--pf-navy)]";

export function Navbar() {
  const { connected } = useWallet();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobilePanelId = useId();

  const navLinks = connected
    ? [...publicNavLinks, journeyLink]
    : [...publicNavLinks];

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const closeIfDesktop = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  const linkClass =
    "block w-full rounded-sm border-2 border-white/70 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] transition-colors active:bg-[var(--pf-soft-blue)]";

  return (
    <header className="site-navbar sticky top-0 z-50 w-full border-b-4 border-[var(--pf-soft-blue)] shadow-[0_4px_0_0_var(--pf-soft-blue)]">
      <nav
        className="relative z-[60] mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 sm:py-4"
        aria-label="Main"
      >
        <Link
          href="/"
          className="min-w-0 shrink text-sm leading-snug tracking-tight text-[var(--pf-bg)] sm:text-base"
          onClick={() => setMobileOpen(false)}
        >
          <span className="block font-semibold">Gamified Finances</span>
        </Link>

        {/* Desktop */}
        <div className="hidden min-w-0 flex-1 flex-wrap items-center justify-end gap-3 md:flex md:gap-4">
          <ul className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
            {navLinks.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="inline-block rounded-sm border-2 border-white/70 bg-white/5 px-3.5 py-2 text-sm font-medium leading-none text-white shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] transition-colors hover:border-white hover:bg-[var(--pf-soft-blue)] hover:text-white hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-4 md:text-[0.9375rem]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {connected ? <NavbarWalletDropdown /> : <WalletConnectButton />}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border-2 border-white/70 bg-white/10 text-white shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
          aria-expanded={mobileOpen}
          aria-controls={mobilePanelId}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              aria-hidden
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile sheet */}
      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[40] bg-black/45 md:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={() => setMobileOpen(false)}
          />
          <div
            id={mobilePanelId}
            className="absolute left-0 right-0 top-full z-[50] max-h-[min(70dvh,calc(100dvh-4rem))] overflow-y-auto border-b-4 border-[var(--pf-soft-blue)] bg-[var(--pf-navy)] px-4 py-4 shadow-lg md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className={linkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-white/15 pt-4">
              {connected ? (
                <NavbarWalletDropdown fullWidth />
              ) : (
                <WalletConnectButton className={mobileConnectClass} />
              )}
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
