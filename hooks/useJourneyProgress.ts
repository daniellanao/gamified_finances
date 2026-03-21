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
  const [isRegistered, setIsRegistered] = useState(false);

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

  // 2. Setup transactions
  const { writeContract, isPending: isTxPending } = useWriteContract();

  // Update local state when blockchain data changes
  useEffect(() => {
    if (playerData) {
      const [nickname, pLevel, pCoins, exists] = playerData as [string, bigint, bigint, boolean];
      setIsRegistered(exists);
      if (exists) {
        setLevelState(Number(pLevel));
        setCoinsState(Number(pCoins));
      } else {
        setLevelState(1);
        setCoinsState(0);
      }
    } else {
      setIsRegistered(false);
    }
  }, [playerData]);

  // ... (rest of the hook)

  const registerOnChain = (nickname: string) => {
    if (!address) return;
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: abi,
      functionName: "register",
      args: [nickname],
    });
  };

  const completeLevelOnChain = (nextLevel: number, reward: number) => {
    if (!address || !isRegistered) return;
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: abi,
      functionName: "completeLevel",
      args: [BigInt(nextLevel), BigInt(reward)],
    });
  };

  return {
    level,
    coins,
    isRegistered,
    ready: !isLoading,
    isTxPending,
    registerOnChain,
    completeLevelOnChain,
    refetch,
    setLevel: (next: number) => completeLevelOnChain(next, 50),
    addCoins: (delta: number) => {},
  };
}
