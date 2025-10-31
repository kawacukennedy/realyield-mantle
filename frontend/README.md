# RealYield Frontend

A comprehensive Next.js frontend for RealYield: Compliant On-Chain Yield Vaults for Real-World Assets on Mantle Network.

## 🚀 Features

### Core Functionality
- **Landing Page**: Hero section, "How It Works", vault explorer with real-time yields
- **Dashboard**: Portfolio overview, active vaults, transaction history, yield tracking
- **Asset Creation**: 5-step wizard for tokenizing real estate assets with compliance checks
- **Vault Management**: Deposit/withdraw flows with gas optimization and yield calculations
- **KYC Onboarding**: Multi-step verification process with ZK proofs for privacy
- **Admin Panel**: Comprehensive compliance management, audit logs, system controls

### Advanced Features
- **Progressive Web App (PWA)**: Offline functionality, service worker caching, push notifications
- **Real-time Notifications**: Transaction alerts, yield distributions, security notifications
- **Settings Panel**: Profile management, privacy controls, notification preferences
- **Responsive Design**: Mobile-first approach with Mantle-themed dark UI
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### Technical Highlights
- **Web3 Integration**: Wagmi + Viem for Mantle network interactions
- **ZK Proofs**: Privacy-preserving compliance verification
- **Real-time Data**: Live yield calculations and portfolio tracking
- **Security**: Multi-signature requirements, emergency pause functionality

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

1. **Clone and install**:
```bash
git clone https://github.com/kawacukennedy/realyield-mantle.git
cd realyield-mantle/frontend
npm install --legacy-peer-deps
```

2. **Environment setup**:
```bash
cp .env.example .env.local
```

3. **Configure environment variables**:
```env
NEXT_PUBLIC_MANTLE_RPC=https://rpc.mantle.xyz
NEXT_PUBLIC_MANTLE_TESTNET_RPC=https://rpc.testnet.mantle.xyz
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

4. **Start development server**:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📱 PWA Installation

The app supports PWA installation for offline access:

1. Open in Chrome/Edge on desktop or mobile
2. Click "Install RealYield" in the address bar
3. Or use "Add to Home Screen" on mobile

## 🏗️ Build & Deploy

### Local Build
```bash
npm run build
npm run start  # Production preview
```

### Deploy to Vercel
1. **Connect repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Deploy to Netlify
```bash
npm run build
npm run export  # For static deployment
```

## 🧪 Testing

```bash
npm run test          # Run Jest tests
npm run test:watch    # Watch mode
npm run type-check    # TypeScript validation
npm run lint          # ESLint checks
```

## 📚 User Guide

### For Investors
1. **Connect Wallet**: Use MetaMask to connect to Mantle network
2. **Complete KYC**: Go through privacy-preserving verification
3. **Browse Vaults**: Explore available real estate yield opportunities
4. **Deposit Funds**: Invest in vaults with optimized gas fees
5. **Track Performance**: Monitor yields and portfolio in dashboard

### For Asset Managers
1. **Create Asset**: Use the 5-step wizard to tokenize real estate
2. **Set Parameters**: Configure yield rates, minimum investments, lock periods
3. **Compliance**: Ensure all regulatory requirements are met
4. **Manage Vaults**: Monitor deposits, handle withdrawals, distribute yields

### For Admins
1. **Access Admin Panel**: Navigate to `/admin` (requires admin role)
2. **KYC Management**: Review and approve/reject verification requests
3. **Custody Oversight**: Monitor settlement requests and approvals
4. **Audit Logs**: Export comprehensive activity logs
5. **System Controls**: Emergency pause, oracle updates

## 🔧 Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_MANTLE_RPC` | Mantle mainnet RPC URL | Yes |
| `NEXT_PUBLIC_MANTLE_TESTNET_RPC` | Mantle testnet RPC URL | No |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `NEXT_PUBLIC_BACKEND_URL` | Backend API base URL | Yes |

### Network Configuration
- **Mainnet**: Mantle mainnet (chain ID: 5000)
- **Testnet**: Mantle testnet (chain ID: 5001)
- **Gas Optimization**: Automatic gas estimation and EIP-1559 support

## 🛡️ Security Features

- **Multi-signature Requirements**: Critical operations require multiple approvals
- **Emergency Pause**: Admin can halt operations in case of issues
- **Audit Logging**: All admin actions are logged with timestamps and IP addresses
- **ZK Compliance**: Privacy-preserving KYC verification
- **Input Validation**: Comprehensive client and server-side validation

## 📊 Monitoring & Analytics

- **Real-time Metrics**: TVL, active users, transaction volume
- **Yield Tracking**: Historical and projected yield calculations
- **Compliance Dashboard**: KYC completion rates, pending reviews
- **System Health**: Uptime monitoring, error tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with proper TypeScript types
4. Add tests for new functionality
5. Ensure build passes and linting is clean
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

---

**Built with ❤️ for the Mantle ecosystem**
