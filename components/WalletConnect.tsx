"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { WagmiProvider, useAccount, useDisconnect } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { config } from "@/lib/wagmi-config";

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

export function WalletConnectProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const value = useMemo(
    () => ({
      open: () => {}, // Handled by RainbowKit's ConnectButton
      connected: isConnected,
      disconnect: () => disconnect(),
      address: address ?? "",
    }),
    [isConnected, address, disconnect],
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WalletConnectContext.Provider value={value}>
            {children}
          </WalletConnectContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
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
  // Use RainbowKit's default ConnectButton for the best experience
  return <ConnectButton />;
}
