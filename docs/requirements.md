title RealYield: Compliant On-Chain Yield Vaults for Real-World Assets (RWA) on Mantle

// User Interfaces
User Interfaces [icon: users] {
  Next.js Frontend [icon: nextdotjs]
  MetaMask Connector [icon: metamask]
  WalletConnect Connector [icon: walletconnect]
}

// Backend Services
Backend Services [icon: server] {
  Custody Bridge Worker [icon: handshake]
  KYC Provider Integration [icon: shield]
  Oracle Service [icon: bar-chart-2]
  ZK Prover Service [icon: eye-off]
  "Off-chain Data Store" [icon: database]
}

// Smart Contracts (Mantle)
Smart Contracts [icon: ethereum] {
  Asset Tokenizer [icon: file-plus]
  Vault Contract [icon: package]
  Share Token [icon: dollar-sign]
  Compliance Module [icon: check-circle]
  Yield Distributor [icon: pie-chart]
  ZK Module [icon: lock]
}

// Data Availability
Data Availability [icon: cloud] {
  Mantle DA [icon: cloud]
  Mantle SDK [icon: code]
}

// Monitoring & DevOps
Monitoring & DevOps [icon: activity] {
  Dashboard [icon: monitor]
  Alerts [icon: bell]
  "CI/CD" [icon: github]
  Logging [icon: file-text]
}

// Standalone Nodes
Mantle Testnet [icon: ethereum]
Mantle Mainnet [icon: ethereum]
IPFS [icon: ipfs]
QuickNode RPC [icon: lightning]
Alchemy RPC [icon: zap]

// Connections

// User to Frontend

// Wallet connections
Next.js Frontend > MetaMask Connector
Next.js Frontend > WalletConnect Connector

// Frontend to Backend
Next.js Frontend > Custody Bridge Worker: custody settlement
Next.js Frontend > KYC Provider Integration: KYC attestation
Next.js Frontend > ZK Prover Service: ZK proof request
Next.js Frontend > Oracle Service: price/yield data
Next.js Frontend > "Off-chain Data Store": upload asset docs

// Frontend to Smart Contracts (via Mantle)
Next.js Frontend > Asset Tokenizer: mint asset token
Next.js Frontend > Vault Contract: deposit/withdraw
Next.js Frontend > Share Token: view/claim shares
Next.js Frontend > Compliance Module: compliance check
Next.js Frontend > Yield Distributor: view yield
Next.js Frontend > ZK Module: submit proof

// Backend to Smart Contracts
Custody Bridge Worker > Vault Contract: unlock shares
KYC Provider Integration > Compliance Module: attest KYC
Oracle Service > Vault Contract: update asset/yield data
ZK Prover Service > ZK Module: submit proof
"Off-chain Data Store" > Asset Tokenizer: asset metadata URI

// Smart Contract internal connections
Asset Tokenizer > Vault Contract: deposit asset token
Vault Contract > Share Token: mint shares
Vault Contract > Compliance Module: enforce KYC/roles
Vault Contract > Yield Distributor: yield calculation
Vault Contract > ZK Module: verify withdrawal proof
Yield Distributor > Share Token: distribute yield
ZK Module > Compliance Module: verify eligibility

// Data Availability
Asset Tokenizer > IPFS: store asset docs/metadata
"Off-chain Data Store" > IPFS: store encrypted PII/docs
Asset Tokenizer > Mantle DA: store proofs/metadata
Vault Contract > Mantle DA: store vault state/proofs
Mantle DA > Mantle SDK: data access

// RPC Providers
Next.js Frontend > QuickNode RPC: Mantle access
Next.js Frontend > Alchemy RPC: Mantle access

// Mantle Networks


// Monitoring & DevOps
Vault Contract > Dashboard: vault health
Compliance Module > Dashboard: compliance status
Yield Distributor > Dashboard: yield events
Dashboard > Alerts: notify on failure
Dashboard > Logging: audit logs
Smart Contracts > Mantle Testnet
Smart Contracts > Mantle Mainnet
Smart Contracts < "CI/CD": deploy/verify
Next.js Frontend < "CI/CD": deploy
Backend Services < "CI/CD": deploy {
  "app_prompt": {
    "title": "RealYield: Compliant On-Chain Yield Vaults for Real-World Assets (RWA) on Mantle",
    "goal": "End-to-end RealFi platform: tokenize real-world cash flows, pool into KYC-gated yield vaults, distribute audited yield on Mantle. Focus: security, compliance, privacy, developer DX, and demonstrable Mantle integration.",
    "scope": "Complete hackathon MVP plus production-ready feature list. Includes UI specs, UX flows, smart contracts, backend services, ZK, DA integration, monitoring, CI/CD, docs and demo artifacts.",
    "features_exhaustive": {
      "UI_SPECIFICATIONS": {
        "global": {
          "design_system": {
            "tokens": {
              "colors": {
                "mantleBlue": "#00BFFF",
                "mantleGreen": "#00FFB2",
                "bgDark": "#0E141B",
                "panel": "#111418",
                "text": "#E6EEF3",
                "muted": "#98A2B3",
                "success": "#16A34A",
                "danger": "#EF4444"
              },
              "spacing": ["4","8","12","16","24","32","48"],
              "radii": { "sm": "6px", "md": "12px", "lg": "24px" },
              "typography": {
                "h1": "48px/56px semibold",
                "h2": "32px/40px semibold",
                "body": "16px/24px regular",
                "mono": "14px/20px monospace"
              },
              "animations": {
                "fadeIn": "opacity .28s ease",
                "cardLift": "translateY(-6px) shadow .28s",
                "pulse": "scale(1.02) .6s ease infinite alternate"
              }
            },
            "components": [
              "Button (primary/secondary/ghost/outline, disabled states)",
              "Input (text, number, fileupload, datepicker)",
              "Modal (centered, full-screen for mobile)",
              "Toast (success/info/error)",
              "SidePanel (wizard)",
              "DataTable (sortable, filterable, virtualized)",
              "Chart (line, area, bar with hover tooltips)",
              "Avatar/IdentityBadge (wallet or KYC badge)",
              "ProgressStepper (wizard steps)",
              "Badge (status: KYC, pending, verified)",
              "LoadingSkeletons"
            ],
            "accessibility": {
              "contrast": "meets WCAG 2.1 AA",
              "keyboard": "full keyboard nav",
              "aria": "ARIA labels for interactive elements",
              "reducedMotion": "prefers-reduced-motion support"
            }
          }
        },
        "pages_and_components": {
          "Landing": {
            "purpose": "High-level intro, quick demo, CTA to sandbox or connect wallet",
            "sections": [
              "Hero (headline, 2-line supporting copy, CTA: Connect Wallet / Demo)",
              "How it works (3-step cards with micro-animations)",
              "Vault explorer preview (top vaults, TVL)",
              "Security & compliance badges (KYC, ZK, custodial disclaimers)",
              "Footer (links: docs, repo, one-pager, legal)"
            ],
            "interactions": [
              "Hero CTA opens wallet connector modal",
              "Hover on step cards expands micro animation",
              "Preview vaults have quick-deposit CTA"
            ]
          },
          "Dashboard": {
            "purpose": "Investor/Issuer overview",
            "layout": "3-column responsive (summary, primary content, actions/notifications)",
            "widgets": [
              "Portfolio summary (TVL, total yield earned, pending withdrawals)",
              "Vaults list (filters: yield, risk, asset type, jurisdiction)",
              "Activity timeline (tx history, custody events, proof submissions)",
              "Quick action panel (deposit, withdraw, mint asset)"
            ],
            "specs": {
              "chart": { "type": "area", "xAxis": "time", "yAxis": "fiat value", "tooltipFields": ["vault", "APY", "timestamp"] }
            },
            "edge_cases": [
              "No vaults: show guided CTA to create/join sandbox vault",
              "Disconnected wallet: inline message + connect button"
            ]
          },
          "Create Asset Wizard": {
            "purpose": "Issuer tokenizes an off-chain asset",
            "steps": [
              { "1": "Asset Info (title, issuer name, valuation, maturity, currency)" },
              { "2": "Upload Docs (drag & drop -> client-side encryption -> IPFS pin; show CID preview)" },
              { "3": "Custody Settlement Request (simulate or request custodian confirmation)" },
              { "4": "Terms (fees, yield schedule, liquidation preference)" },
              { "5": "Review & Sign (display transaction gas, summary, KYC requirement)" }
            ],
            "component_behavior": {
              "file_upload": {
                "client_side_encrypt": true,
                "progress_bar": true,
                "validation": { "max_size_MB": 50, "allowed_types": ["pdf","png","jpg","docx"] }
              },
              "validation": {
                "real_time": true,
                "server_side_checks": [ "duplicate_asset_check", "valuation_range_warning" ]
              },
              "transactions": {
                "mint_flow": "mintAsset(uri, proofHash, valuation, maturity) -> tx modal with nonce and gas estimate"
              }
            }
          },
          "Vault Page (Issuer / Investor)": {
            "sections": [
              "Top panel: vault name, TVL, APY, jurisdiction badge, risk score",
              "Action buttons: Deposit, Withdraw, View Terms, Audit reports",
              "Holdings table: assets backing vault (with onchain status, CID links)",
              "Yield schedule & history with charts",
              "Withdrawal queue & expected fulfillment time"
            ],
            "deposit_flow": {
              "1": "Connect wallet & confirm KYC",
              "2": "Select fiat or stablecoin deposit (fiat flows use custody bridge)",
              "3": "Estimate shares based on asset valuation",
              "4": "Sign deposit tx and receive share tokens"
            }
          },
          "KYC Onboarding Flow": {
            "screens": [
              "Profile creation (email, minimal contact)",
              "KYC form (PII collected via third-party widget or self-hosted flow)",
              "Consent & Data Retention notice",
              "Attestation issuance (backend returns signed attestation bound to wallet)"
            ],
            "ui_notes": {
              "attestation_modal": "show attestation expiry, jurisdiction flags, revocation link",
              "error_states": ["failed verification", "unsupported jurisdiction", "expired attestation"]
            }
          },
          "Admin Panel": {
            "functions": [
              "Review KYC exceptions",
              "Approve / reject custody settlement requests",
              "Push emergencyPause to contracts",
              "Schedule oracle updates",
              "Audit logs and export (CSV/PDF)"
            ],
            "ui_controls": [
              "bulk actions",
              "audit timeline viewer",
              "manual merkle root publish"
            ]
          },
          "ZK Proof UX": {
            "purpose": "Allow users to generate and submit selective disclosure proofs",
            "flow": [
              "User requests proof -> show UX: explain what will be revealed (flag only)",
              "Prover UI: spinner with progress, estimated time, cost (if any)",
              "Pre-verify: show server-side verification result",
              "Submit proof to contract -> success toast and action permitted"
            ],
            "ux_considerations": [
              "Explainability: short copy explaining ZK in plain language",
              "Failure recovery: allow proof re-generation, logs for debugging"
            ]
          }
        }
      },
      "UX_FLOWS_DETAILED": {
        "ISSUER_FLOW_FULL": [
          "Register & connect wallet",
          "Complete KYC (attestation bound to wallet)",
          "Create asset: fill metadata -> upload docs (client encrypt -> IPFS CID) -> estimate valuation",
          "Request custodial settlement (POST /settlement) with pre-signed invoice",
          "Custodian confirms off-chain fiat receipt -> CustodyBridgeWorker receives signed receipt -> worker calls VaultContract.forceUnlockByCustodian(assetId)",
          "Mint asset onchain (AssetTokenizer.mintAsset(uri, proofHash, valuation))",
          "List asset into vault or propose new vault with terms",
          "Monitor vault health via dashboard; respond to investor inquiries"
        ],
        "INVESTOR_FLOW_FULL": [
          "Visit Landing -> connect wallet -> check KYC status",
          "If KYC missing: trigger KYC flow -> receive signed attestation",
          "Browse vaults: filter by APY / asset type / jurisdiction / risk score",
          "Select vault -> click Deposit -> choose fiat (custodial) or onchain stablecoin",
          "If fiat: show fiat transfer instructions -> custodian processes -> custody worker posts receipt -> shares minted; If onchain: sign tx to deposit stable -> VaultContract.mintSharesForDeposit",
          "Shares appear in connected wallet -> display in portfolio",
          "Yield accrues automatically; user claims via YieldDistributor.claimYield -> claim merkle proof verified by smart contract or via onchain claim"
        ],
        "WITHDRAWAL_FLOW_FULL": [
          "Investor requests withdrawal -> contract creates WithdrawRequest event (queued with expected fulfillment time)",
          "If vault has liquidity: immediate onchain redemption of share tokens -> transfer of stablecoin to user wallet",
          "If illiquid: create custody settlement request -> custodian authorizes fiat payout -> custody worker calls withdrawFulfill -> offchain fiat sent",
          "All state changes emitted as events and visible in dashboard"
        ],
        "KYV (KYC Verification) EDGE_CASES": [
          "Expired attestation: block deposit and prompt for renewal",
          "Revoked attestation: admin panel displays revocation reason + block interactions",
          "Jurisdiction blocked: show clear messaging and alternatives"
        ],
        "ZK_EDGE_CASES": [
          "Proof generation timeout: show retry & debug log",
          "Proof verification fail: provide user-friendly error (mismatched public inputs) and allow local debug"
        ]
      },
      "SMART_CONTRACTS_EXHAUSTIVE": {
        "naming_and_ABIs": {
          "AssetTokenizer": {
            "ABI_summary": {
              "mintAsset": { "inputs": ["string uri","address issuer","bytes32 proofHash","uint256 valuation","uint256 maturity"], "outputs": ["uint256 assetId"] },
              "lockAssetForVault": { "inputs": ["uint256 assetId","address vault"], "permissions": "issuer or custodian" }
            }
          },
          "VaultContract": {
            "ABI_summary": {
              "depositAsset": { "inputs": ["uint256 assetId"], "effects": ["increase backing", "mint shares"] },
              "requestWithdrawal": { "inputs": ["uint256 shares"], "effects": ["queue withdrawal", "emit WithdrawRequest"] },
              "settleWithdrawal": { "inputs": ["bytes signedReceipt"], "permissions": "custodyBridge" }
            }
          },
          "ShareToken": { "features": ["permit/EIP-2612", "transfer hooks for compliance checks"] },
          "ComplianceModule": { "verifyAttestation": { "inputs": ["address wallet","bytes attestation"], "returns": "bool" } },
          "YieldDistributor": { "distributeYield": { "inputs": ["uint256 period"], "mechanism": "Merkle per-period or direct transfer depending on gas optimization" } },
          "ZKModule": { "verifyProof": { "inputs": ["bytes proof","bytes publicInputs"], "returns": "bool" } }
        },
        "upgradeability": {
          "pattern": "Transparent proxy with TimelockController",
          "admin_flow": "Timelock -> Execute upgrade after governance/admin approval window"
        },
        "events_and_oracles": {
          "events": ["AssetMinted","Deposit","WithdrawRequest","WithdrawFulfilled","KYCAttested","ProofSubmitted","YieldDistributed"],
          "oracle_integration": "OracleService pushes signed updates; VaultContract accepts only signatures from registered oracle key"
        }
      },
      "BACKEND_SERVICES_DETAIL": {
        "CUSTODY_BRIDGE_WORKER": {
          "interfaces": {
            "ingress": "POST /settlement/confirm (payload: { assetId, custodianId, fiatAmount, receiptSig })",
            "egress": "call VaultContract.forceUnlockByCustodian(assetId, receiptSig)"
          },
          "reliability": {
            "retries": "exponential backoff",
            "idempotency": "receiptId dedupe",
            "auditing": "store signed receipts in OffChainDataStore with WORM"
          }
        },
        "KYC_PROVIDER": {
          "flow": "User submits PII -> provider validates -> provider returns signed attestation {walletPubKey, claims, expiry, signature}",
          "storage": "Encrypted PII in OffChainDataStore; attestation hash stored onchain"
        },
        "ORACLE_SERVICE": {
          "aggregation": "multiple sources -> medianize -> sign -> POST /oracle/push",
          "redundancy": "fallback providers & circuit breaker on sudden price deviation"
        },
        "ZK_PROVER_SERVICE": {
          "components": ["circuit manager", "prover pool", "cache of publicInputs -> proof"],
          "optimizations": ["precompute common proofs (jurisdiction flags)", "reusable witness templates"]
        },
        "OFF_CHAIN_DATA_STORE": {
          "schema_samples": {
            "assets": { "assetId","issuer","cid","valuation","maturity","status" },
            "kyc": { "wallet","attestationHash","expiry","jurisdiction" },
            "custody_receipts": { "receiptId","assetId","signedBy","timestamp","status" }
          }
        }
      },
      "API_AND_DATA_SCHEMAS": {
        "REST_ENDPOINTS": {
          "GET /v1/vaults": { "query": ["page","filter"], "response_sample": { "vaults": [{ "id","name","tvl","apy","risk_score" }] } },
          "POST /v1/assets": { "body": { "issuer","metadataCID","valuation","maturity" }, "response": { "assetId","txHash" } },
          "POST /v1/kyc/submit": { "body": { "walletPubKey","piiEncrypted" }, "response": { "status","attestationId" } },
          "POST /v1/zk/generate": { "body": { "wallet","proofType" }, "response": { "proofId","estimate_ms" } }
        },
        "WEBHOOKS": {
          "on-asset-minted": { "payload": { "assetId","issuer","txHash" } },
          "on-withdrawal-fulfilled": { "payload": { "requestId","status","txHash" } }
        }
      },
      "MONITORING_AND_DEVOPS": {
        "METRICS_COLLECTED": [
          "txs_per_minute",
          "avg_gas_per_tx",
          "proof_generation_time_ms",
          "kyc_attestations_per_day",
          "custody_settlement_latency"
        ],
        "ALERT_RULES": [
          "oracle_stale > 10m => severity high",
          "custody_timeout > SLA_threshold => page oncall",
          "failed_tx_rate > 5% => create incident"
        ],
        "CI_CD_PIPELINE": {
          "steps": [
            "lint (frontend & contracts)",
            "unit tests (contracts & backend)",
            "solidity static analysis (slither)",
            "deploy to testnet (auto)",
            "run integration smoke tests",
            "manual approval -> deploy to staging/mainnet"
          ]
        }
      },
      "TESTING_AND_AUDIT": {
        "test_types": [
          "unit (JS & Solidity)",
          "integration (Hardhat + local chain fork)",
          "e2e (Playwright/Cypress flows)",
          "fuzzing (foundry/harpoon integration)",
          "gas regression tests"
        ],
        "audit_process": [
          "pre-audit checklist",
          "external audit (recommended vendors)",
          "fixes and re-audit",
          "public security disclosure and bug-bounty"
        ]
      },
      "PERFORMANCE_AND_SCALABILITY": {
        "patterns": [
          "batch oracle updates",
          "merkle distribution for yields",
          "prefetch and cache DA results for UI",
          "scale zk provers horizontally"
        ]
      },
      "DELIVERABLES_HACKATHON": [
        "Contracts deployed to Mantle testnet (addresses + verification)",
        "Next.js frontend hosted (Vercel or static URL)",
        "Backend custody & KYC simulator with documented API",
        "ZK prototype and demo proof artifacts",
        "README + deployment & run instructions",
        "3–5 minute demo video, one-pager, pitch slides",
        "automated tests and basic audit report"
      ],
      "DEMO_CRITERIA": {
        "issuer_can_mint_asset": "True",
        "investor_can_deposit_receive_shares": "True",
        "kyc_required_on_deposit": "Enforced",
        "custody_settlement_flow": "Simulated and demonstrated",
        "zk_proof_verification": "Onchain verification of demo proof",
        "yield_distribution": "Scheduled distribution & claimable by holders"
      },
      "REPO_STRUCTURE_SUGGESTED": {
        "root": {
          "contracts/": ["src/","test/","deploy/","README.md"],
          "frontend/": ["pages/","components/","styles/","tests/"],
          "backend/": ["api/","workers/","migrations/"],
          "zk/": ["circuits/","scripts/","witnesses/"],
          "infra/": ["terraform/","helm/","docker-compose.yml"],
          "docs/": ["architecture.md","api.md","compliance.md"]
        }
      },
      "SAMPLE_ENV_VARS": {
        "NEXT_PUBLIC_MANTLE_RPC": "https://mantle-rpc.example",
        "CUSTODY_WORKER_KEY": "encrypted-in-kms",
        "KYC_PROVIDER_API_KEY": "xxxx",
        "ORACLE_SIGNING_KEY": "kms:oracle-signing-key",
        "IPFS_GATEWAY": "https://ipfs.example"
      },
      "SECURITY_AND_COMPLIANCE_NOTES": {
        "PII_POLICY": "PII never stored onchain. Attestations only. Encrypted offchain with retention policy and deletion on request.",
        "LEGAL_DISCLAIMER": "Demo not financial advice. Custodial settlement requires regulated partner.",
        "REGIONAL_RESTRICTIONS": "Block jurisdictions as required by partner policies; expose config in admin panel"
      },
      "UX_MICROCOPY_EXAMPLES": {
        "deposit_button": "Deposit — requires KYC",
        "kyc_pending": "KYC pending: verification usually takes 24–72 hours",
        "proof_generating": "Generating privacy proof — this may take up to 30s",
        "custody_processing": "Custody processing: awaiting custodian confirmation"
      },
      "EDGE_CASES_AND_RECOVERY": {
        "orphaned_asset": "If custodian never confirms, asset flagged for manual review in admin; issuer notified and refund path initiated.",
        "reorg_handling": "Watch for chain reorgs and re-verify txs > N confirmations before finalizing critical offchain steps.",
        "partial_withdraw_fulfillment": "If only partial liquidity available, system splits fulfilment into onchain + offchain settlement and informs user."
      },
      "IMPLEMENTATION_PRIORITIZATION": {
        "MVP": [
          "AssetToken + Vault + ShareToken contracts",
          "Next.js frontend deposit/withdraw flows",
          "KYC mock/attestation flow",
          "Custody simulator worker",
          "Basic ZK demo (single boolean flag proof)",
          "Deploy to Mantle testnet"
        ],
        "POST_MVP": [
          "Full ZK production circuits",
          "Multiple custodian integrations",
          "Formal audit",
          "Governance & insurance integrations",
          "Cross-chain bridging"
        ]
      }
    },
    "format_instructions": {
      "output_format": "Return JSON scaffold OR generate code templates on request. Provide example API payloads, contract ABI stubs, and UI component props if requested.",
      "constraints": "No human faces in marketing assets. Keep PII off-chain. Use Mantle testnet for demos."
    }
  }
}