const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Mock data
let vaults = [{ id: 1, name: 'Test Vault', tvl: 100000, apy: 8.5, risk_score: 3 }];
let assets = [];
let kyc = {};
let custodyReceipts = [];

// REST Endpoints
app.get('/v1/vaults', (req, res) => {
  res.json({ vaults });
});

app.post('/v1/assets', (req, res) => {
  const { issuer, metadataCID, valuation, maturity } = req.body;
  const assetId = assets.length + 1;
  assets.push({ assetId, issuer, cid: metadataCID, valuation, maturity, status: 'pending' });
  res.json({ assetId, txHash: 'mock-tx' });
});

app.post('/v1/kyc/submit', (req, res) => {
  const { walletPubKey, piiEncrypted } = req.body;
  const attestationId = 'attest-' + walletPubKey;
  kyc[walletPubKey] = { attestationHash: 'mock-hash', expiry: Date.now() + 365*24*60*60*1000, jurisdiction: 'US' };
  res.json({ status: 'success', attestationId });
});

app.post('/v1/zk/generate', (req, res) => {
  const { wallet, proofType } = req.body;
  res.json({ proofId: 'proof-123', estimate_ms: 30000 });
});

// Custody Bridge Worker
app.post('/settlement/confirm', (req, res) => {
  const { assetId, custodianId, fiatAmount, receiptSig } = req.body;
  custodyReceipts.push({ receiptId: 'rec-' + assetId, assetId, signedBy: custodianId, timestamp: Date.now(), status: 'confirmed' });
  // Call VaultContract.forceUnlockByCustodian (mock)
  res.json({ success: true });
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

// ZK Prover Service
app.post('/zk/generate', (req, res) => {
  // Generate proof
  res.json({ proof: 'mock-proof', publicInputs: [] });
});

// Off-chain Data Store
app.post('/data/store', (req, res) => {
  const { type, data } = req.body;
  const hash = 'hash-' + Math.random();
  res.json({ hash });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});