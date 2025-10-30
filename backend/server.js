const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Mock Custody Bridge
app.post('/custody/settle', (req, res) => {
  const { assetId } = req.body;
  // Simulate settlement
  res.json({ success: true, message: `Asset ${assetId} settled` });
});

// Mock KYC Provider
app.post('/kyc/attest', (req, res) => {
  const { userAddress } = req.body;
  // Simulate KYC attestation
  res.json({ success: true, attestation: 'mock-jwt-token' });
});

// Mock Oracle
app.get('/oracle/price', (req, res) => {
  res.json({ price: 100 }); // Mock price
});

// Mock ZK Prover
app.post('/zk/prove', (req, res) => {
  const { userAddress } = req.body;
  // Simulate proof generation
  res.json({ proof: 'mock-proof' });
});

// Mock Off-chain Data Store
app.post('/data/store', (req, res) => {
  const { data } = req.body;
  // Simulate storing data
  res.json({ success: true, hash: 'mock-hash' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});