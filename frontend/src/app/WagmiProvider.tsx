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
    walletConnect({ projectId: 'your-project-id' }),
  ],
  transports: {
    [mantle.id]: http(),
    [mantleTestnet.id]: http(),
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