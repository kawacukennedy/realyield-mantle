'use client';

import { createConfig, http, WagmiProvider as WagmiProviderCore } from 'wagmi';
import { mantle, mantleTestnet } from 'viem/chains';
import { metaMask, walletConnect } from 'wagmi/connectors';

const config = createConfig({
  chains: [mantle, mantleTestnet],
  connectors: [
    metaMask(),
    walletConnect({ projectId: 'your-project-id' }),
  ],
  transports: {
    [mantle.id]: http(),
    [mantleTestnet.id]: http(),
  },
});

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProviderCore config={config}>
      {children}
    </WagmiProviderCore>
  );
}