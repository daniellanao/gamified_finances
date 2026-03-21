"use client";

import { useAccount, useReadContract, useWriteContract, useWatchContractEvents } from "wagmi";
import { useEffect, useState } from "react";
import { CONTRACT_ADDRESS } from "@/lib/wagmi-config";
import abi from "@/lib/abi.json";

export const JOURNEY_MAX_LEVEL = 5;

export function useJourneyProgress() {
  const { address, isConnected } = useAccount();
  const [level, setLevelState] = useState(1);
  const [coins, setCoinsState] = useState(0);

  // 1. Read player data from the blockchain
  const { data: playerData, refetch, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "players",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    }
  });

  // 2. Setup level completion transaction
  const { writeContract, isPending: isTxPending } = useWriteContract();

  // Update local state when blockchain data changes
  useEffect(() => {
    if (playerData) {
      const [nickname, pLevel, pCoins, exists] = playerData as [string, bigint, bigint, boolean];
      if (exists) {
        setLevelState(Number(pLevel));
        setCoinsState(Number(pCoins));
      } else {
        // Player exists but isn't registered yet?
        // We'll handle registration in a real app, 
        // but for now let's assume level 1.
        setLevelState(1);
        setCoinsState(0);
      }
    }
  }, [playerData]);

  // Watch for events to refetch data automatically
  useWatchContractEvents({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    onLogs() {
      refetch();
    },
  });

  const completeLevelOnChain = (nextLevel: number, reward: number) => {
    if (!address) return;
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: abi,
      functionName: "completeLevel",
      args: [BigInt(nextLevel), BigInt(reward)],
    });
  };

  // Mock functions for compatibility with existing components during transition
  const setLevel = (next: number) => completeLevelOnChain(next, 50); // Default reward
  const addCoins = (delta: number) => {}; // In blockchain, coins come from completeLevel

  return {
    level,
    coins,
    ready: !isLoading,
    isTxPending,
    setLevel,
    addCoins,
    completeLevelOnChain,
    refetch,
  };
}
