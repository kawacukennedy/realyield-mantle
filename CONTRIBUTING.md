# Contributing to RealYield

Thank you for your interest in contributing to RealYield! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet
- Mantle testnet access

### Setup
1. Fork and clone the repository
2. Install dependencies for all components
3. Set up environment variables
4. Run the development servers

## 📋 Development Workflow

### 1. Choose an Issue
- Check [GitHub Issues](https://github.com/RealYieldApp/mantle-realyield/issues) for open tasks
- Comment on the issue to indicate you're working on it
- Create a new branch: `git checkout -b feature/your-feature-name`

### 2. Code Development
- Follow the existing code style
- Write tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 3. Commit Guidelines
- Use clear, descriptive commit messages
- Follow conventional commits format:
  ```
  feat: add new vault creation feature
  fix: resolve deposit amount validation bug
  docs: update API documentation
  ```

### 4. Pull Request
- Push your branch to GitHub
- Create a Pull Request with a clear description
- Reference any related issues
- Request review from maintainers

## 🏗️ Architecture Guidelines

### Frontend
- Use TypeScript for all new code
- Follow React best practices
- Implement proper error boundaries
- Ensure accessibility (WCAG 2.1 AA)

### Backend
- Use async/await for asynchronous operations
- Implement proper error handling
- Add input validation
- Follow REST API conventions

### Smart Contracts
- Use OpenZeppelin contracts
- Implement proper access controls
- Add comprehensive events
- Gas optimization considerations

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
npm run test:e2e  # Cypress E2E tests
```

### Backend Tests
```bash
cd backend
npm test
```

### Contract Tests
```bash
cd contracts
npx hardhat test
```

### Coverage Requirements
- Frontend: >80% coverage
- Backend: >85% coverage
- Contracts: >90% coverage

## 🔒 Security

### Smart Contract Security
- All contracts must be audited before mainnet deployment
- Use OpenZeppelin contracts for battle-tested implementations
- Implement proper access controls
- Consider gas optimization

### General Security
- Never commit private keys or secrets
- Use environment variables for configuration
- Implement proper input sanitization
- Regular dependency updates

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex logic
- Update README for new features

### API Documentation
- Update API endpoints in README
- Document request/response formats
- Include example usage

## 🚨 Issue Reporting

When reporting bugs, please include:
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, Node version)
- Screenshots/logs if applicable

## 📞 Getting Help

- Join our [Discord](https://discord.gg/realyield) for community support
- Check existing issues and discussions
- Contact maintainers for urgent issues

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.