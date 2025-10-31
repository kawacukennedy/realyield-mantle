# RealYield: Compliant On-Chain Yield Vaults for Real-World Assets (RWA) on Mantle

## Overview

**Purpose**: Complete specification & generator prompt: exhaustive features, deep UI specs, and fully detailed UX flows for engineering/designers to implement a production-ready RealFi app (hackathon MVP → production).

**Version**: 1.1-exhaustive

**Summary**: Tokenize real-world cash flows (invoices, rent, bonds) → pool into KYC-gated vaults → distribute audited yield on Mantle. Includes security, privacy (ZK), custody bridge, oracle integrations, developer SDKs, observability, legal controls and user-centered UX.

## Constraints

- **no_human_faces_marketing**: true
- **PII_never_onchain**: true
- **use_Mantle_testnet_for_demo**: true
- **compliance_disclaimer_required**: true

## High-Level Architecture

### UI
- Next.js (React + TypeScript) SPA
- PWA support
- Tailwind UI + design system

### Wallets
- MetaMask (EIP-1193)
- WalletConnect v2
- Ledger/Trezor

### Backend
- Node.js (TypeScript) microservices
- Postgres
- Redis
- S3-compatible encrypted store

### Workers
- CustodyBridgeWorker
- ZKProverPool
- OracleAggregator

### Contracts
- AssetTokenizer (ERC-1155/721 hybrid)
- VaultContract (ERC-4626-like)
- ShareToken (ERC-20)
- ComplianceModule
- YieldDistributor
- ZKModule

### Data Availability
- Mantle DA
- IPFS pinning
- Off-chain encrypted DB

### RPC Providers
- QuickNode/Alchemy Mantle endpoints

### DevOps
- GitHub Actions
- Docker
- K8s/ECS
- Terraform

### Observability
- Prometheus + Grafana or Datadog
- ELK
- Sentry
## UI Specifications

### Design System

#### Brand Tokens
- **Primary**: #00BFFF
- **Accent**: #00FFB2
- **BG Dark**: #0E141B
- **Surface**: #111418
- **Text**: #E6EEF3
- **Muted**: #98A2B3
- **Success**: #16A34A
- **Warning**: #F59E0B
- **Danger**: #EF4444

#### Typography
- **H1**: 48px/56px semibold
- **H2**: 32px/40px semibold
- **Body**: 16px/24px regular
- **Small**: 14px/20px regular
- **Mono**: 13px/18px monospace

#### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px

#### Radii
- **sm**: 6px
- **md**: 12px
- **lg**: 20px

### Component Catalog

#### Button
- **Variants**: primary, secondary, ghost, outline, danger, icon
- **Props**: label, onClick, loading, disabled, ariaLabel, tooltip, iconLeft, iconRight, size
- **States**: default, hover, active, focus, disabled, loading

#### Input
- **Types**: text, number, email, password, file, date, search, textarea
- **Props**: value, onChange, placeholder, error, helperText, maxLength, ariaLabel, required

#### Modal
- **Sizes**: sm, md, lg, full
- **Props**: title, onClose, footerActions, isBlocking, closeOnEsc
- **Accessibility**: focusTrap: true, ariaModal: true

#### DataTable
- **Features**: sortable, filterable, paginated, virtualized, rowActions, bulkActions, columnResize
- **Props**: columns, rows, onRowClick, page, perPage

#### Chart
- **Types**: line, area, bar, donut
- **Interactions**: tooltip, legendToggle, zoom, exportCSV

#### Uploader
- **Features**: dragDrop, clientEncrypt, chunkedUpload, progress, retry
- **Props**: maxSizeMB, allowedTypes

## UI Pages and Components Detailed

### Landing
- **Hero**: Headline, sub, CTAs (Connect Wallet / Explore Vaults)
- **How It Works**: 3-step cards with Lottie animations
- **Trust Panel**: KYC, ZK, Mantle badges, audit summary

### Vault Explorer
- **List Card**: vaultName, APY, TVL, assetTypes, jurisdiction, riskScore, quickDepositBtn
- **Filters**: assetType, APYRange, jurisdiction, riskScore, liquidity, sortBy
- **Result States**: empty (suggestions), error (retry + contact)

### Dashboard (Investor)
- **Panels**: portfolio_summary, recent_activity, quick_actions
- **Interactions**: click_tx (open modal), deposit_click (DepositWidget modal)

### Create Asset Wizard (Issuer)
- **Step 1**: Asset details (title, description, valuation, currency, maturityDate, issuerContact)
- **Step 2**: Docs upload (dragDrop, clientEncrypt, IPFS pin, CID preview)
- **Step 3**: Custody request (choose custodian, attach bank ref)
- **Step 4**: Terms (fees, minInvestment)
- **Step 5**: Review & mint (gasEstimate, attestationRequired, submit tx)

### Vault Page (Detailed)
- **Header**: vaultName, jurisdictionBadge, APY, TVL, riskScoreBadge, shareTokenTicker
- **Tabs**: Overview, BackingAssets, YieldHistory, Withdrawals, AuditLogs, Settings(if owner)
- **Backing Assets Table**: assetId, type, valuation, maturity, status, cidLink, custodyStatus
- **Deposit Widget**: KYC verify, depositMethods (onchainStable/fiatCustodial), expectedShares & feeBreakdown

### KYC Onboarding UI
- **Flows**: wallet-bound attestation, sign message, provider widget, submit, attestation back
- **Error States**: unsupported_jurisdiction, document_blur, manual_review_required
- **UX Notes**: expected verification time, progress & ticket id

### ZK Proof Generator UI
- **Explain**: Plain-language card about selective disclosure
- **Steps**: select proof type, prepare inputs locally, upload witness, generate proof, preview publicInputs, submit onchain
- **Performance**: estimated proof time & resource usage, background creation with notifications

### Admin Panel
- **Tabs**: Overview, KYC, Custody, Audit, System
- **KYC Management**: exception review, approve/reject
- **Custody**: settlement requests, approval workflow
- **Audit Logs**: export (CSV/JSON/PDF), date filters, search
- **System**: emergency pause, oracle updates

### Mobile UX Specifics
- **Navigation**: bottom navigation bar
- **Compact Tables**: cards with accordion
- **Offline Support**: PWA caching, queue intents for on-device signing

### PWA & Offline Behavior
- **Cachable Routes**: landing, vault_explorer, dashboard_readonly
- **Background Sync**: queue proof generation or fiat deposit instructions
- **Service Worker**: cache static assets + index for offline fallback

## UX Flows Detailed Branching

### Issuer Flow
- **Register**: email+password → verify email, SSO optional, wallet connect required
- **Create Asset**: normal (fill → upload → custody → mint), custody_rejected (reason + re-submit), duplicate_detection (match + override)
- **Minting Errors**: low_gas_funds (top-up guidance + gasless option), revert_from_contract (reason + tx logs)

### Investor Flow
- **Connect & Deposit**: no_kyc (prompt KYC), kyc_pending (wait time + pre-order), deposit_method_branch (onchain: approval → deposit tx → mint shares, fiat: wire instructions → custodian receipt → shares minted)
- **Deposit Failure**: rolled back, refund process + support ticket
- **Claim Yield Flow**: direct_onchain (transfer stable), merkle_claim (generate proof → claimYield(proof)), claim_failure (retry + debug logs)
- **Withdraw Flow**: instant_liquid (burn shares → transfer stable), queued_illiquid (withdrawal request → ETA + partial options), emergency_pause (inform + cancel)

### ZK Flow
- **Normal**: request proof → generate locally/server-assisted → pre-verify → submit to contract → confirm event
- **Timeout/Fail**: troubleshooting (entropy, witness), retry + support contact

### Custody Flow
- **Fiat Deposit**: user wires → custodian validates → signs receipt → worker posts → onchain action
- **Custody Timeout**: SLA exceeded → notify issuer/admin → remediation steps
- **Custody Revocation**: receipt revoked → flag asset → admin review → refund/legal flow

### Admin Emergency Flow
- **Monitor**: alert triggers → incident → logs → affected txs
- **Mitigate**: timelock emergencyPause → notify users → freeze deposits
- **Postmortem**: root cause, timeline, fixes, compensations

## API Spec Examples

### POST /v1/assets
- **Description**: create metadata record & start custody request
- **Body**: { "issuer": "0xabc...", "metadataCID": "ipfs://Qm...", "valuation": "100000.00", "currency": "USD", "maturity": "2026-12-31" }
- **Response**: { "assetId": 123, "txPending": false, "custodyRequestId": "req_abc" }

### POST /v1/settlement/confirm
- **Description**: Custodian posts signed fiat settlement receipt to bridge worker
- **Body**: { "assetId": 123, "custodianId": "cust_01", "fiatAmount": "100000.00", "receiptSig": "0xdeadbeef" }
- **Response**: { "status": "accepted", "bridgeTxHash": "0x...", "notes": "shares will be minted after bridge tx confirms" }

### POST /v1/kyc/submit
- **Description**: Submit encrypted PII (server stores encrypted blob; provider widget initiated)
- **Body**: { "wallet": "0x...", "piiEncryptedCid": "ipfs://Qm..." }
- **Response**: { "status": "pending", "attestationId": "att_01" }

### POST /v1/zk/generate
- **Description**: Request ZK proof generation
- **Body**: { "wallet": "0x...", "proofType": "kyc_boolean" }
- **Response**: { "proofId": "proof_abc", "estimatedMs": 45000 }

## Database Schema Samples

### assets_table
- asset_id (pk), issuer_wallet, cid, valuation, maturity_date, status, mint_tx, created_at, updated_at

### kyc_table
- attestation_id, wallet, attestation_hash, provider, expiry, status, created_at

### custody_receipts
- receipt_id, asset_id, custodian, receipt_sig, cid, status, posted_at

### vaults_table
- vault_id, name, terms_cid, tvl, apy, jurisdiction, status, created_at

### withdrawals_table
- withdrawal_id, vault_id, wallet, shares, status, queued_at, fulfilled_at, fulfillment_tx

## Smart Contracts Detailed

### Asset Tokenizer
- **Purpose**: mint token representing off-chain asset; store onchain commitment to metadata CID & proof hash
- **Events**: AssetMinted(assetId, issuer, cidHash)
- **Functions**:
  - mintAsset(string cid, bytes32 proofHash, uint256 valuation, uint256 maturity) returns (uint256)
  - burnAsset(uint256 assetId)
  - transferToVault(uint256 assetId, address vault)

### Vault Contract
- **Purpose**: manage pooled assets, mint/burn share tokens, handle deposits/withdrawals, coordinate with compliance & ZK
- **Functions**:
  - depositOnchain(uint256 amountStable) payable
  - mintSharesForDeposit(address to, uint256 fiatValue) onlyOracleOrBridge
  - requestWithdrawal(uint256 shares)
  - fulfillWithdrawal(uint256 requestId, bytes custodianSig) onlyCustodyBridge
  - pause() onlyAdmin

### Share Token
- **Features**: ERC20, EIP-2612 permit, snapshotting for distributions/airdrop
- **Mint/Burn**: Vault contract is minter/burner

### Compliance Module
- **Purpose**: verify attestation signatures & expiry, expose eligibility checks to vault
- **Functions**: attestKYC(address wallet, bytes attestation), isEligible(address wallet, bytes criteria) returns (bool)

### Yield Distributor
- **Mechanisms**: periodic direct transfers if gas affordable, Merkle root generation for gas efficiency; publish merkleRoot onchain and allow claim via proofs
- **Functions**: scheduleDistribution(uint256 periodStart, uint256 totalYield), publishMerkleRoot(bytes32 merkleRoot), claim(bytes32[] proof)

### ZK Module
- **Purpose**: onchain verifier for selective disclosure proofs
- **Functions**: submitProof(bytes proofBlob, bytes publicInputs), verify(publicInputs) returns (bool)

## Security and Compliance

### Principles
- least-privilege, attestations only onchain, PII encrypted & access logged, timelock for upgrades, multi-sig for critical actions

### Compliance Patterns
- jurisdiction flags, attestation expiry, audit export endpoints, consent & data deletion workflows

### Legal Requirements
- include demo disclaimer, KYC provider terms, custody partner MOU for production

## Monitoring Alerts and SLOs

### SLO Examples
- custody_settlement_time: <=72 hours 95%
- proof_gen_time: <=60s 90%
- oracle_update_latency: <=5m 99%

### Alert Rules
- oracle_stale > 10m → severity critical
- custody_timeout > SLA → page oncall
- failed_proof_rate > 5% → high severity

### Runbook Snippets
- oracle_stale: check aggregator logs → restart job → notify oncall; if persistent → set vaults to read-only

## Testing Strategy

### Unit Tests
- contracts via Hardhat/Foundry
- backend services using Jest/ts-jest

### Integration Tests
- Hardhat forked Mantle + end-to-end deposit/withdrawal flows

### E2E Tests
- Playwright for wallet flows (connect, approve, tx)

### Fuzzing and Security
- Foundry fuzz tests
- Slither/manticore scans
- mythx or equivalent

### Audit
- external audit recommended before mainnet launch; bug bounty program post-audit

## Developer Experience

### Local Dev
- **Scripts**: start-local.sh to run hardhat node, mock services, frontend
- **Seed Data**: seed wallets, mock vaults, sample assets
- **Env Sample**:
  - NEXT_PUBLIC_MANTLE_RPC: https://mantle-testnet.example
  - DATABASE_URL: postgres://user:pass@localhost:5432/realyield
  - IPFS_GATEWAY: https://ipfs.example
  - KYC_PROVIDER_KEY: xxxx

### SDK
- **Mantle SDK Examples**: connectDA, submitTx, fetchDAProof
- **JS Helpers**: mintAsset(metadataCid, valuation), depositToVault(vaultId, amount), generateProof(proofType)

### Docs
- OpenAPI spec + postman collection + developer onboarding guide

## Metrics and Judge KPIs

### MVP KPIs
- Deployed contracts on Mantle testnet
- Functional end-to-end deposit→share flow
- KYC attestation enforced
- ZK proof demo works onchain
- Demo video & one-pager

### Performance KPIs
- avg_gas_per_tx
- proof_generation_ms
- custody_settlement_latency
- TVL_growth_demo

### Security KPIs
- test_coverage_pct
- static_analysis_warnings
- external_audit_scope

## Product and Business

### Monetization
- deposit/withdrawal fee
- management fee
- premium analytics
- white-labeling

### Go-to-Market
- pilot with custodians and SME invoice platforms
- grant/VC outreach
- Mantle ecosystem partnerships

### Legal Docs
- tos, privacy, kyc_policy, custody_mou_template

## Deliverables Hackathon

- GitHub repo with tags for contracts/frontend/backend/zk/infra
- Deployed contracts addresses (Mantle testnet) with verification
- Hosted Next.js demo (Vercel) or livestream
- Backend custody & KYC simulator API with docs
- ZK prototype circuit + proof artifacts + onchain verifier (testnet)
- Automated tests & basic static analysis report
- 3–5 minute demo video and one-pager

## Acceptance Criteria Detailed

### issuer_can_mint_asset
- **Steps**: upload doc → get CID → custody receipt posted → mintAsset invoked → AssetMinted emitted
- **Evidence**: assetId, ipfsCID, txHash, custody receipt record

### investor_deposit_shares
- **Steps**: KYC attested → deposit via onchain or fiat → mint shares → shares in wallet
- **Evidence**: shareToken balance, deposit txHash, attestation hash

### kyc_enforced_on_deposit
- **Behavior**: deposit txs revert or blocked by frontend if no valid attestation

### custody_settlement_unlocks_asset
- **Behavior**: CustodyBridgeWorker calls forceUnlockByCustodian → Vault receives asset

### zk_proof_allows_action
- **Behavior**: submitProof → verifyProof true → Vault allows deposit/withdraw without PII disclosure

### yield_distribution_working
- **Behavior**: scheduleDistribution → publishMerkleRoot → holders can claim

## Sample API Payloads and Responses

### asset_mint_request
- **Request**: { "issuer": "0xabc...", "metadataCid": "ipfs://Qm...", "valuation": "100000.00", "maturity": "2026-12-31" }
- **Response**: { "assetId": 123, "status": "custody_pending", "mintTx": null }

### custody_receipt_post
- **Request**: { "assetId": 123, "custodianId": "cust_01", "fiatAmount": "100000", "receiptSig": "0xdeadbeef" }
- **Response**: { "status": "accepted", "bridgeTxHash": "0xabc...", "notes": "shares will be minted after bridge tx confirms" }

### zk_generate
- **Request**: { "wallet": "0xabc...", "proofType": "kyc_boolean" }
- **Response**: { "proofId": "proof_01", "estimatedMs": 45000, "status": "queued" }

## Localization and i18n

### Supported Languages
- en, fr, es, pt

### i18n Approach
- key-based JSON localization files, server-side fallbacks, RTL support prepared

### Translation Process
- PO files or crowdin integration for rapid localization

## Analytics and Privacy

### Events to Track
- connect_wallet, deposit_initiated, deposit_completed, asset_minted, kyc_started, kyc_completed, proof_generated, claim_yield

### Tools
- Plausible or Matomo for privacy-first analytics
- mixpanel optional for product analytics (PII-free)

### Privacy Rules
- no PII to analytics, anonymize wallet addresses (hash with salt), allow opt-out

## Feature Flags and Release Strategy

### Flags
- zk_proofs_enabled, fiat_custody_enabled, multi_custodian, merkle_yield_claims

### Rollout
- use LaunchDarkly or simple DB-driven flags; enable canary releases and gradual ramp

## Scaling and Cost Optimizations

### Patterns
- batch oracle updates
- merkle distribution for yields
- DA offload (store heavy proofs & metadata in Mantle DA and reference by hash onchain)
- caching (edge CDN + stale-while-revalidate for vault list and charts)

## Incident and Recovery

### Incident Template
- title, severity, impact, timeline, actions_taken, root_cause, remediation, owner

### Recovery Steps Example
- on oracle outage, set vaults to read-only, notify users, failover to backup oracle, postmortem

## Next Actions If User Wants Code

### Options
- **A**: Generate Hardhat contract stubs + tests (AssetTokenizer, VaultContract, ShareToken, ComplianceModule, YieldDistributor, ZKModule)
- **B**: Scaffold Next.js app pages + components (Landing, Dashboard, CreateAssetWizard, VaultPage, KYC flow, ZK UI)
- **C**: Create Node.js TypeScript skeletons for backend services (CustodyBridgeWorker, KYC Adapter, OracleService, ZKProverService)
- **D**: Produce Circom circuit & snarkjs scripts for boolean KYC proof and a small verifier contract
- **E**: OpenAPI v3 JSON for the backend APIs described

**Note**: Pick one or more and the system will generate complete files, sample envs, and run commands in this response.
}