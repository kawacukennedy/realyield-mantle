# RealYield Frontend

A Next.js frontend for RealYield: Compliant On-Chain Yield Vaults for Real-World Assets on Mantle.

## Features

- Landing page with hero, how it works, vault explorer
- Dashboard with portfolio summary, vaults, activity timeline
- Create Asset Wizard (5-step process)
- Vault page with deposit/withdraw flows
- KYC onboarding flow
- Admin panel for compliance management
- ZK proof generation UX
- Mantle-themed design system

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Fill in your environment variables (RPC URLs, WalletConnect project ID, backend URL)

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

- `NEXT_PUBLIC_MANTLE_RPC`: Mantle mainnet RPC URL
- `NEXT_PUBLIC_MANTLE_TESTNET_RPC`: Mantle testnet RPC URL
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: WalletConnect project ID
- `NEXT_PUBLIC_BACKEND_URL`: Backend API URL

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

The `vercel.json` is configured for Next.js deployment.
