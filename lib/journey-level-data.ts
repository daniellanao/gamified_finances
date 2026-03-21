import { createPublicClient, http, readContract } from "viem";
import { avalancheFuji } from "viem/chains";
import { CONTRACT_ADDRESS } from "./wagmi-config";
import abi from "./abi.json";
import type { LevelData } from "@/types/level";

// Public client for reading on-chain data without a wallet
const publicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(),
});

/**
 * Fetch Level CID from the blockchain and then get JSON content from IPFS.
 */
export async function getLevelDataForJourneyLevel(
  journeyLevel: number,
): Promise<LevelData | null> {
  try {
    // 1. Fetch the CID from the Avalanche Fuji contract
    const cid = (await readContract(publicClient, {
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: abi,
      functionName: "levelCIDs",
      args: [BigInt(journeyLevel)],
    })) as string;

    if (!cid || cid === "") {
      console.warn(`No CID found for level ${journeyLevel}`);
      return null;
    }

    // 2. Fetch the JSON content from an IPFS gateway
    // Using Pinata's public gateway or generic ones like ipfs.io
    const gateway = `https://gateway.pinata.cloud/ipfs/${cid}`;
    const response = await fetch(gateway);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch IPFS content for CID: ${cid}`);
    }

    const data = await response.json();
    return data as LevelData;
  } catch (error) {
    console.error("Error fetching level data:", error);
    return null;
  }
}

/** localStorage key for current slide index within a level pack */
export function slideIndexStorageKey(levelId: string) {
  return `gf_${levelId}_slide_index`;
}
