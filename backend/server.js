const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Mock data
let vaults = [
  {
    id: 1,
    name: 'Commercial Real Estate Fund',
    tvl: 2500000,
    apy: 8.5,
    risk_score: 3,
    assetTypes: ['office', 'retail'],
    jurisdiction: 'US',
    status: 'active'
  },
  {
    id: 2,
    name: 'Residential Rental Portfolio',
    tvl: 1800000,
    apy: 7.2,
    risk_score: 2,
    assetTypes: ['residential'],
    jurisdiction: 'US',
    status: 'active'
  },
  {
    id: 3,
    name: 'Industrial Properties',
    tvl: 3200000,
    apy: 9.1,
    risk_score: 4,
    assetTypes: ['industrial', 'warehouse'],
    jurisdiction: 'EU',
    status: 'active'
  }
];

let assets = [
  {
    assetId: 1,
    issuer: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    cid: 'ipfs://QmXxx...',
    valuation: 1000000,
    maturity: '2026-12-31',
    currency: 'USD',
    status: 'confirmed',
    created_at: '2024-01-15T10:00:00Z'
  }
];

let kyc = {};
let custodyReceipts = [];
let auditLogs = [
  {
    id: 1,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    action: 'KYC_EXCEPTION_REVIEWED',
    user: 'admin@realyield.com',
    details: 'Approved KYC exception for user 0x1234...abcd',
    severity: 'medium',
    ipAddress: '192.168.1.100'
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    action: 'CUSTODY_SETTLEMENT_APPROVED',
    user: 'admin@realyield.com',
    details: 'Approved custody settlement for asset asset-1 ($1,000,000)',
    severity: 'high',
    ipAddress: '192.168.1.100'
  }
];

// REST Endpoints
app.get('/v1/vaults', (req, res) => {
  const { page = 1, filter } = req.query;
  let filteredVaults = vaults;
  if (filter) {
    // Simple filtering logic
    filteredVaults = vaults.filter(v =>
      v.name.toLowerCase().includes(filter.toLowerCase()) ||
      v.assetTypes?.some(type => type.toLowerCase().includes(filter.toLowerCase()))
    );
  }
  res.json({
    vaults: filteredVaults.slice((page - 1) * 10, page * 10),
    total: filteredVaults.length,
    page: parseInt(page)
  });
});

app.post('/v1/assets', (req, res) => {
  const { issuer, metadataCID, valuation, maturity, currency = 'USD' } = req.body;
  const assetId = assets.length + 1;
  const newAsset = {
    assetId,
    issuer,
    cid: metadataCID,
    valuation: parseFloat(valuation),
    maturity,
    currency,
    status: 'custody_pending',
    created_at: new Date().toISOString()
  };
  assets.push(newAsset);
  res.json({
    assetId,
    status: 'custody_pending',
    custodyRequestId: `req_${assetId}`,
    txPending: false
  });
});

app.post('/v1/kyc/submit', (req, res) => {
  const { wallet, piiEncryptedCid } = req.body;
  const attestationId = 'att_' + Math.random().toString(36).substr(2, 9);
  kyc[wallet] = {
    attestationId,
    attestationHash: 'mock-hash-' + attestationId,
    provider: 'mock-provider',
    expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    created_at: new Date().toISOString()
  };
  // Simulate processing delay
  setTimeout(() => {
    kyc[wallet].status = 'verified';
  }, 2000);
  res.json({
    status: 'pending',
    attestationId,
    estimated_completion: '24-72 hours'
  });
});

app.post('/v1/zk/generate', (req, res) => {
  const { wallet, proofType } = req.body;
  const proofId = 'proof_' + Math.random().toString(36).substr(2, 9);
  // Simulate proof generation
  setTimeout(() => {
    // Proof would be stored here
  }, 30000);
  res.json({
    proofId,
    estimatedMs: 30000,
    status: 'queued',
    queue_position: 1
  });
});

// Custody Bridge Worker
app.post('/v1/settlement/confirm', (req, res) => {
  const { assetId, custodianId, fiatAmount, receiptSig } = req.body;
  const receiptId = 'rec_' + Math.random().toString(36).substr(2, 9);
  const receipt = {
    receiptId,
    assetId: parseInt(assetId),
    custodianId,
    fiatAmount: parseFloat(fiatAmount),
    receiptSig,
    status: 'accepted',
    posted_at: new Date().toISOString(),
    bridgeTxHash: '0x' + Math.random().toString(16).substr(2, 64)
  };
  custodyReceipts.push(receipt);

  // Update asset status
  const asset = assets.find(a => a.assetId === parseInt(assetId));
  if (asset) {
    asset.status = 'confirmed';
  }

  res.json({
    status: 'accepted',
    bridgeTxHash: receipt.bridgeTxHash,
    notes: 'shares will be minted after bridge tx confirms',
    receiptId
  });
});

// KYC Provider
app.post('/kyc/attest', (req, res) => {
  const { walletPubKey, claims, expiry, signature } = req.body;
  res.json({ attestation: { walletPubKey, claims, expiry, signature } });
});

// Oracle Service
app.post('/oracle/push', (req, res) => {
  // Push signed updates
  res.json({ success: true });
});

// ZK Proof Generation Service
app.post('/zk/generate', (req, res) => {
  const { wallet, proofType, publicInputs } = req.body;
  const proofId = 'proof_' + Math.random().toString(36).substr(2, 9);

  // Simulate proof generation delay
  setTimeout(() => {
    // In production, this would call Circom/SnarkJS
    const mockProof = {
      proofId,
      proof: 'mock-zk-proof-' + proofId,
      publicInputs: publicInputs || [],
      status: 'generated',
      generatedAt: new Date().toISOString()
    };

    // Store proof (in production, store in database)
    console.log('Generated ZK proof:', mockProof);
  }, 10000); // 10 seconds

  res.json({
    proofId,
    status: 'generating',
    estimatedMs: 10000,
    message: 'Proof generation started'
  });
});

// ZK Proof Verification Service
app.post('/zk/verify', (req, res) => {
  const { proof, publicInputs } = req.body;

  // Simulate verification
  const isValid = Math.random() > 0.1; // 90% success rate for demo

  res.json({
    isValid,
    verifiedAt: new Date().toISOString(),
    message: isValid ? 'Proof verified successfully' : 'Proof verification failed'
  });
});

// Price Oracle Service
app.get('/oracle/prices', (req, res) => {
  // Mock price feeds
  const prices = {
    ETH: { price: 2500, timestamp: Date.now() },
    USDC: { price: 1.00, timestamp: Date.now() },
    MNT: { price: 0.85, timestamp: Date.now() }
  };

  res.json({
    prices,
    source: 'mock-oracle',
    updatedAt: new Date().toISOString()
  });
});

// Custody Settlement Service
app.post('/custody/settle', (req, res) => {
  const { assetId, amount, currency, custodianId } = req.body;

  // Simulate custody settlement
  const settlementId = 'settlement_' + Math.random().toString(36).substr(2, 9);

  setTimeout(() => {
    // Simulate settlement completion
    console.log(`Settlement ${settlementId} completed for asset ${assetId}`);
  }, 5000);

  res.json({
    settlementId,
    status: 'pending',
    estimatedCompletion: '5-10 minutes',
    custodianId,
    amount,
    currency
  });
});

// KYC Status Check
app.get('/kyc/status/:wallet', (req, res) => {
  const { wallet } = req.params;

  // Mock KYC status check
  const kycStatus = {
    wallet,
    status: Math.random() > 0.2 ? 'verified' : 'pending', // 80% verified for demo
    verifiedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    jurisdiction: 'US',
    expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  };

  res.json(kycStatus);
});

// Audit logs endpoint
app.get('/v1/audit/logs', (req, res) => {
  const { page = 1, limit = 50, search, dateFrom, dateTo } = req.query;
  let filteredLogs = auditLogs;

  if (search) {
    filteredLogs = filteredLogs.filter(log =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (dateFrom && dateTo) {
    filteredLogs = filteredLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= new Date(dateFrom) && logDate <= new Date(dateTo);
    });
  }

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);

  res.json({
    logs: filteredLogs.slice(start, end),
    total: filteredLogs.length,
    page: parseInt(page),
    limit: parseInt(limit)
  });
});

// Off-chain Data Store
app.post('/v1/data/store', (req, res) => {
  const { type, data, encrypted = true } = req.body;
  const hash = 'hash_' + Math.random().toString(36).substr(2, 9);
  // In real implementation, this would store to IPFS/S3 with encryption
  res.json({
    hash,
    cid: `ipfs://${hash}`,
    stored: true,
    encrypted
  });
});

// Webhook for contract events (mock)
app.post('/webhooks/contract-events', (req, res) => {
  const { eventType, contractAddress, transactionHash, blockNumber, args } = req.body;
  console.log(`Contract event: ${eventType}`, { contractAddress, transactionHash, args });

  // Process event (e.g., update database, trigger notifications)
  res.json({ processed: true, eventId: Math.random().toString(36) });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: 'connected',
      ipfs: 'available',
      oracle: 'operational'
    }
  });
});

app.listen(PORT, () => {
  console.log(`RealYield Backend API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});