# RealYield Demo Script

## Overview
RealYield is a compliant on-chain yield vault platform built on Mantle Network, enabling tokenization of real-world assets with KYC-gated access and zero-knowledge privacy.

## Prerequisites
- Node.js 18+
- MetaMask or WalletConnect
- Mantle testnet tokens (available from faucet)

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```

### 2. Smart Contracts Deployment
```bash
cd contracts
npm install
npm run compile
npm run deploy:mantle-testnet
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Demo Flow

### Phase 1: Landing & Wallet Connection
1. **Navigate to landing page** (`http://localhost:3000`)
   - Show hero section with key value propositions
   - Display live vault statistics
   - Demonstrate responsive design

2. **Wallet Connection**
   - Click "Connect Wallet"
   - Show MetaMask integration
   - Display connected status

### Phase 2: KYC Verification
1. **Navigate to KYC page** (`/kyc`)
   - Show multi-step KYC process
   - Demonstrate form validation
   - Mock document upload flow

2. **Complete KYC**
   - Fill out identity information
   - Upload mock documents
   - Show verification completion

### Phase 3: Vault Operations
1. **Dashboard Overview** (`/dashboard`)
   - Display available vaults
   - Show user's portfolio
   - Demonstrate filtering/sorting

2. **Vault Details** (`/vault/[id]`)
   - Show vault statistics (APY, TVL, risk)
   - Display deposit/withdrawal interface
   - Show transaction history

3. **Deposit Flow**
   - Select vault
   - Enter deposit amount
   - Approve token spending
   - Confirm transaction
   - Show success notification

### Phase 4: Yield Distribution
1. **Yield Monitoring**
   - Show yield accumulation
   - Display distribution history
   - Demonstrate real-time updates

2. **Withdrawal Flow**
   - Initiate withdrawal request
   - Show pending status
   - Complete withdrawal

## Key Features to Highlight

### Security & Compliance
- KYC-required access
- Zero-knowledge proofs for privacy
- Custodial settlement
- Regulatory compliance

### Technical Architecture
- ERC-4626 compliant vaults
- ERC-1155 tokenized assets
- Mantle Network integration
- React/Next.js frontend
- Node.js backend

### User Experience
- Progressive Web App (PWA)
- Responsive design
- Real-time notifications
- Dark/light theme support

## Testing Commands

### Unit Tests
```bash
cd contracts && npm test
cd frontend && npm test
```

### E2E Tests
```bash
cd frontend && npm run test:e2e
```

### Performance Analysis
```bash
cd frontend && npm run build:analyze
```

## Deployment

### Staging
```bash
cd frontend && npm run build
# Deploy to Vercel staging
```

### Production
```bash
cd contracts && npm run deploy:mantle-mainnet
cd frontend && npm run build
# Deploy to production
```

## Troubleshooting

### Common Issues
1. **MetaMask connection fails**
   - Ensure Mantle testnet is added to MetaMask
   - Check network configuration

2. **Transaction fails**
   - Verify sufficient testnet tokens
   - Check gas prices
   - Confirm contract addresses

3. **KYC verification stuck**
   - Check backend service status
   - Verify API endpoints

## Demo Checklist
- [ ] Landing page loads correctly
- [ ] Wallet connection works
- [ ] KYC flow completes
- [ ] Vault deposit succeeds
- [ ] Yield distribution shows
- [ ] Withdrawal processes
- [ ] Mobile responsiveness
- [ ] Dark/light theme toggle
- [ ] PWA functionality
- [ ] Performance metrics

## Contact
For questions or issues during demo:
- Check browser console for errors
- Verify all services are running
- Ensure testnet connectivity