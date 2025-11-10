const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  describe('GET /v1/vaults', () => {
    it('should return list of vaults', async () => {
      const response = await request(app)
        .get('/v1/vaults')
        .expect(200);

      expect(response.body).toHaveProperty('vaults');
      expect(Array.isArray(response.body.vaults)).toBe(true);
    });

    it('should filter vaults by search term', async () => {
      const response = await request(app)
        .get('/v1/vaults?filter=real estate')
        .expect(200);

      expect(response.body.vaults.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('POST /v1/assets', () => {
    it('should create new asset', async () => {
      const assetData = {
        issuer: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        metadataCID: 'ipfs://QmTest123',
        valuation: 1000000,
        maturity: '2026-12-31',
        currency: 'USD'
      };

      const response = await request(app)
        .post('/v1/assets')
        .send(assetData)
        .expect(200);

      expect(response.body).toHaveProperty('assetId');
      expect(response.body).toHaveProperty('status', 'custody_pending');
    });
  });

  describe('POST /v1/kyc/submit', () => {
    it('should submit KYC request', async () => {
      const kycData = {
        wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        piiEncryptedCid: 'ipfs://QmEncrypted123'
      };

      const response = await request(app)
        .post('/v1/kyc/submit')
        .send(kycData)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'pending');
      expect(response.body).toHaveProperty('attestationId');
    });
  });

  describe('POST /v1/zk/generate', () => {
    it('should request ZK proof generation', async () => {
      const proofData = {
        wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        proofType: 'kyc_boolean'
      };

      const response = await request(app)
        .post('/v1/zk/generate')
        .send(proofData)
        .expect(200);

      expect(response.body).toHaveProperty('proofId');
      expect(response.body).toHaveProperty('status', 'queued');
    });
  });

  describe('POST /v1/settlement/confirm', () => {
    it('should confirm custody settlement', async () => {
      const settlementData = {
        assetId: 1,
        custodianId: 'cust_01',
        fiatAmount: 1000000,
        receiptSig: '0xsignature123'
      };

      const response = await request(app)
        .post('/v1/settlement/confirm')
        .send(settlementData)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'accepted');
      expect(response.body).toHaveProperty('bridgeTxHash');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('services');
    });
  });
});