# RealYield

Compliant On-Chain Yield Vaults for Real-World Assets (RWA) on Mantle

## Overview

RealYield is a platform for tokenizing real-world cash-flow assets like invoices, rental income, and short-term bonds into yield-bearing vaults on the Mantle blockchain.

## Architecture

- **Frontend**: Next.js with TypeScript, Tailwind CSS, MetaMask and WalletConnect
- **Smart Contracts**: Solidity with Hardhat, OpenZeppelin libraries
- **Backend**: Node.js with Express for services like KYC, custody, oracle, ZK prover

## Getting Started

1. Clone the repo
2. Install dependencies in each directory (frontend, contracts, backend)
3. For contracts: `npx hardhat compile`
4. For backend: `npm start`
5. For frontend: `npm run dev`

## Deployment

Contracts can be deployed to Mantle testnet using `npx hardhat run scripts/deploy.js --network mantleTestnet`

## License

MIT