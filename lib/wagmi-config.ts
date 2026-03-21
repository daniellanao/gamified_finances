import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { avalancheFuji } from 'wagmi/chains';
import { http } from 'wagmi';

export const CONTRACT_ADDRESS = '0x6C705a4a29061F6fcDD1D2D87339c983DeC11CAa';

export const config = getDefaultConfig({
  appName: 'Gamified Finances',
  projectId: '7461317fbc4d0f5e9335b0a8d3a364cc', // from https://cloud.walletconnect.com
  chains: [avalancheFuji],
  transports: {
    [avalancheFuji.id]: http(),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});
