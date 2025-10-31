'use client';

import { useState, useEffect } from 'react';
import { createConfig, http, WagmiProvider as WagmiProviderCore } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mantle, mantleTestnet } from 'viem/chains';
import { metaMask, walletConnect } from 'wagmi/connectors';

const config = createConfig({
  chains: [mantle, mantleTestnet],
  connectors: [
    metaMask(),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id' }),
  ],
  transports: {
    [mantle.id]: http(process.env.NEXT_PUBLIC_MANTLE_RPC || 'https://rpc.mantle.xyz'),
    [mantleTestnet.id]: http(process.env.NEXT_PUBLIC_MANTLE_TESTNET_RPC || 'https://rpc.testnet.mantle.xyz'),
  },
});

const queryClient = new QueryClient();

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <WagmiProviderCore config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProviderCore>
  );
}