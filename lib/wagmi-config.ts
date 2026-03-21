import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { avalancheFuji } from 'wagmi/chains';
import { http } from 'wagmi';

export const CONTRACT_ADDRESS = '0x5D0fee2d4159F102C4EDc81187A9fb2BFc6C5a40';

export const config = getDefaultConfig({
  appName: 'Gamified Finances',
  projectId: '7461317fbc4d0f5e9335b0a8d3a364cc', // from https://cloud.walletconnect.com
  chains: [avalancheFuji],
  transports: {
    [avalancheFuji.id]: http(),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});
