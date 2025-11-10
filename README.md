# RealYield

Compliant On-Chain Yield Vaults for Real-World Assets (RWA) on Mantle Network

> 📋 **[Demo Script](demo.md)** - Step-by-step demo instructions

## 🎯 Overview

RealYield enables the tokenization of real-world cash-flow assets (invoices, rental income, bonds) into compliant, yield-bearing vaults on the Mantle blockchain. The platform combines DeFi yields with traditional asset performance while maintaining regulatory compliance through ZK proofs and multi-signature controls.

## 🏗️ Architecture

### System Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │ Smart Contracts │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   (Solidity)    │
│                 │    │                 │    │                 │
│ • User Interface│    │ • API Services  │    │ • Vault Logic   │
│ • Wallet Connect│    │ • KYC Provider  │    │ • Compliance    │
│ • Dashboard     │    │ • ZK Prover     │    │ • ZK Verifier   │
│ • Proof Manager │    │ • Custody Bridge│    │ • Yield Dist.   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Mantle DA     │
                    │   (Data Avail.) │
                    └─────────────────┘
```

### Components

#### Frontend (`/frontend`)
- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS with custom Mantle theme
- **Web3**: Wagmi + Viem for Mantle network integration
- **UI**: Custom component library with animations
- **PWA**: Service worker, offline support, push notifications

#### Smart Contracts (`/contracts`)
- **Language**: Solidity ^0.8.19
- **Framework**: Hardhat
- **Libraries**: OpenZeppelin (AccessControl, ERC20, ERC4626)
- **Features**: Vault contracts, compliance modules, ZK verification

#### Backend (`/backend`)
- **Runtime**: Node.js with Express
- **Services**: KYC verification, custody management, oracle feeds, ZK proving
- **Database**: PostgreSQL for user data and compliance records

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet
- Mantle testnet MNT for gas fees (get from [Mantle Faucet](https://faucet.testnet.mantle.xyz))

### Installation

1. **Clone repository**:
```bash
git clone https://github.com/RealYieldApp/mantle-realyield.git
cd mantle-realyield
```

2. **Install dependencies**:
```bash
# Frontend
cd frontend && npm install --legacy-peer-deps && cd ..

# Backend
cd backend && npm install && cd ..

# Contracts
cd contracts && npm install && cd ..
```

3. **Environment setup**:
```bash
# Frontend
cd frontend
cp .env.example .env.local
# Configure Mantle RPC and API keys

# Backend
cd ../backend
cp .env.example .env
# Configure Mantle RPC and database

# Contracts
cd ../contracts
cp .env.example .env
# Add your private key for deployment
```

4. **Start services**:
```bash
# Terminal 1: Smart Contracts
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network mantleTestnet

# Terminal 2: Backend
cd backend
npm start

# Terminal 3: Frontend
cd frontend
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📋 Demo Flow

### Demo Flow

1. **Connect Wallet**: Use MetaMask connected to Mantle testnet (Chain ID: 5001)
2. **Complete KYC**: Go to `/kyc` and follow the 4-step verification process
3. **Explore Vaults**: Visit `/dashboard` to see available yield vaults
4. **View Vault Details**: Click on any vault to see performance charts and deposit/withdraw options
5. **Deposit Assets**: Select a vault and deposit ETH/USDC with KYC verification
6. **Generate ZK Proofs**: Visit `/proofs` to create privacy-preserving proofs
7. **Monitor Activity**: Track deposits, yields, and proof generation in real-time

### Key Features to Test
- ✅ ERC-1155 asset tokenization with compliance linkage
- ✅ ERC-4626 vault composability with yield distribution
- ✅ ZK selective disclosure proofs for privacy
- ✅ KYC-attested wallet verification
- ✅ Mantle network integration (Chain ID 5001)
- ✅ Real-time vault statistics and performance tracking

## 🏭 Deployment

### Smart Contracts
```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network mantleTestnet
# Verify on Mantle Explorer: https://explorer.testnet.mantle.xyz

# Or for mainnet:
npx hardhat run scripts/deploy.js --network mantle
# Verify on Mantle Explorer: https://explorer.mantle.xyz
```

### Backend
```bash
cd backend
npm run build
npm start  # Production
# Or use PM2 for production deployment
```

### Frontend
```bash
cd frontend
npm run build
npm start  # Production preview

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
npm run export
```

### Environment Variables

#### Frontend (`.env.local`)
```env
NEXT_PUBLIC_MANTLE_RPC=https://rpc.mantle.xyz
NEXT_PUBLIC_MANTLE_TESTNET_RPC=https://rpc.testnet.mantle.xyz
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

#### Backend (`.env`)
```env
PORT=3001
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
MANTLE_RPC_URL=https://rpc.testnet.mantle.xyz
MANTLE_CHAIN_ID=5001
```

#### Contracts (`.env`)
```env
PRIVATE_KEY=your_private_key_without_0x_prefix
MANTLE_TESTNET_RPC=https://rpc.testnet.mantle.xyz
MANTLE_RPC=https://rpc.mantle.xyz
```

## 📡 API Reference

### Backend Endpoints

#### Vaults
- `GET /v1/vaults` - List available vaults with filtering
- `GET /v1/vaults/:id` - Get vault details and statistics

#### Assets
- `POST /v1/assets` - Create new asset tokenization request
- `GET /v1/assets/:id` - Get asset details

#### KYC & Compliance
- `POST /v1/kyc/submit` - Submit KYC verification request
- `GET /v1/kyc/status/:wallet` - Check KYC verification status

#### ZK Proofs
- `POST /v1/zk/generate` - Generate ZK proof
- `POST /v1/zk/verify` - Verify ZK proof

#### Custody & Settlement
- `POST /v1/settlement/confirm` - Confirm custody settlement
- `GET /v1/custody/status/:assetId` - Check custody status

#### Oracle & Feeds
- `GET /oracle/prices` - Get current price feeds
- `POST /oracle/push` - Push oracle updates (admin only)

### Contract Interfaces

#### AssetTokenizer
```solidity
function mintAsset(address owner, string metadataURI, bytes attestationHash) returns (uint256)
function batchMintAsset(address[] owners, string[] metadataURIs) onlyOwner
```

#### Vault
```solidity
function deposit(uint256 assets, address receiver) returns (uint256)
function withdraw(uint256 assets, address receiver, address owner) returns (uint256)
function requestWithdrawal(uint256 shares) external
function settleWithdrawal(bytes proof, uint256 shares) external
```

#### ComplianceModule
```solidity
function addAttestation(address user, bytes attestationHash) external
function isCompliant(address user) view returns (bool)
function revoke(address user) onlyOwner
```

## 🧪 Testing

```bash
# Contracts
cd contracts && npx hardhat test

# Frontend
cd frontend && npm test

# Backend
cd backend && npm test
```

## 📊 Monitoring

- **Contract Events**: Monitor vault deposits/withdrawals
- **Yield Calculations**: Real-time APY updates
- **Compliance**: KYC completion rates, audit logs
- **System Health**: Uptime, error rates, gas usage

## 🔒 Security

- **Multi-signature**: Critical operations require multiple approvals
- **Emergency Pause**: Admin can halt operations instantly
- **Audit Logging**: All admin actions are timestamped and logged
- **ZK Compliance**: Privacy-preserving verification without revealing PII
- **Input Validation**: Comprehensive client and server-side checks

## 🛠️ Development

### Local Development Setup

1. **Environment Variables**:
   ```bash
   # Frontend (.env.local)
   NEXT_PUBLIC_MANTLE_RPC=https://rpc.testnet.mantle.xyz
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

   # Backend (.env)
   PORT=3001
   DATABASE_URL=postgresql://...
   MANTLE_RPC_URL=https://rpc.testnet.mantle.xyz

   # Contracts (.env)
   PRIVATE_KEY=your_private_key_without_0x_prefix
   MANTLE_TESTNET_RPC=https://rpc.testnet.mantle.xyz
   ```

2. **Database Setup** (for backend):
   ```sql
   CREATE DATABASE realyield;
   -- Run migrations from backend/migrations/
   ```

3. **ZK Circuit Setup** (optional):
   ```bash
   cd contracts
   # Install circom and snarkjs
   npm install -g circom snarkjs
   # Generate proving/verification keys
   ```

### Code Quality

- **Linting**: `npm run lint` (frontend)
- **Type Checking**: `npm run type-check` (frontend)
- **Testing**: `npm test` (all components)
- **Contract Verification**: Use Hardhat verify plugin

### Deployment Checklist

- [ ] Run full test suite
- [ ] Update contract addresses in frontend config
- [ ] Verify contracts on Mantle explorer
- [ ] Test KYC flow end-to-end
- [ ] Validate ZK proof generation
- [ ] Check gas optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation for API changes
- Ensure contracts are audited before mainnet deployment

## 📚 Documentation

- **[API Reference](docs/API.md)** - Complete API documentation
- **[Requirements](docs/requirements.md)** - Detailed system specifications
- **[Contributing](CONTRIBUTING.md)** - Development guidelines

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Mantle ecosystem
- Inspired by traditional finance yield products
- Powered by Web3 infrastructure

---

**RealYield - Bringing Real-World Yields On-Chain** 🏠💰