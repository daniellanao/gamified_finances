"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { WagmiProvider, useAccount, useDisconnect } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { config } from "@/lib/wagmi-config";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";

const queryClient = new QueryClient();

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

export function shortenAddress(address: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function RegistrationModal() {
  const { isConnected } = useAccount();
  const { isRegistered, registerOnChain, isTxPending, ready } = useJourneyProgress();
  const [nickname, setNickname] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show registration if connected but not registered
    if (ready && isConnected && !isRegistered) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [ready, isConnected, isRegistered]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md border-[4px] border-[var(--pf-navy)] bg-[var(--pf-bg)] p-6 shadow-[8px_8px_0_0_var(--pf-navy)]">
        <h2 className="text-xl font-bold text-[var(--pf-navy)] mb-4 uppercase tracking-tight">
          Welcome, Traveler!
        </h2>
        <p className="text-sm text-[var(--pf-slate)] mb-6 leading-relaxed">
          Before you start your financial journey on Avalanche, choose a nickname to identify yourself on the leaderboard.
        </p>

        <label className="block text-xs font-bold uppercase text-[var(--pf-navy)] mb-2">
          Your Nickname
        </label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="e.g. Satoshi_Quest"
          className="w-full border-3 border-[var(--pf-navy)] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--pf-gold)]"
          maxLength={20}
        />

        <button
          onClick={() => registerOnChain(nickname)}
          disabled={!nickname || isTxPending}
          className="mt-6 w-full bg-[var(--pf-gold)] border-3 border-[var(--pf-navy)] py-4 font-bold text-[var(--pf-navy)] shadow-[4px_4px_0_0_var(--pf-navy)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--pf-navy)] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--pf-navy)] transition-all disabled:opacity-50"
        >
          {isTxPending ? "Registering..." : "START QUEST"}
        </button>
        
        {isTxPending && (
          <p className="mt-4 text-center text-xs text-blue-600 animate-pulse font-medium">
            Confirm the transaction in your wallet...
          </p>
        )}
      </div>
    </div>
  );
}

function WalletConnectInternal({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const value = useMemo(
    () => ({
      open: () => {}, 
      connected: isConnected,
      disconnect: () => disconnect(),
      address: address ?? "",
    }),
    [isConnected, address, disconnect],
  );

  return (
    <WalletConnectContext.Provider value={value}>
      {children}
      <RegistrationModal />
    </WalletConnectContext.Provider>
  );
}

export function WalletConnectProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WalletConnectInternal>{children}</WalletConnectInternal>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function WalletConnectButton() {
  return <ConnectButton />;
}
