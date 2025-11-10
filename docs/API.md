# RealYield API Documentation

## Overview

The RealYield backend provides RESTful APIs for managing vaults, assets, KYC verification, ZK proofs, and custody operations.

Base URL: `http://localhost:3001` (development)

## Authentication

Most endpoints require wallet signature authentication. Include the following headers:

```
X-Wallet-Address: 0x...
X-Signature: 0x...
X-Message: <signed message>
```

## Endpoints

### Vaults

#### GET /v1/vaults

List available yield vaults with optional filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `filter` (string): Search filter for vault names or asset types

**Response:**
```json
{
  "vaults": [
    {
      "id": 1,
      "name": "Commercial Real Estate Fund",
      "tvl": 2500000,
      "apy": 8.5,
      "risk_score": 3,
      "assetTypes": ["office", "retail"],
      "jurisdiction": "US",
      "status": "active"
    }
  ],
  "total": 1,
  "page": 1
}
```

#### GET /v1/vaults/:id

Get detailed vault information and statistics.

**Response:**
```json
{
  "id": 1,
  "name": "Commercial Real Estate Fund",
  "tvl": 2500000,
  "apy": 8.5,
  "depositors": 150,
  "yieldDistributed": 85000,
  "strategy": "Residential Rental Portfolio",
  "riskScore": 3,
  "custodian": "Institutional Custodian LLC",
  "performance": [
    {"date": "2024-01", "value": 1000000},
    {"date": "2024-02", "value": 1050000}
  ]
}
```

### Assets

#### POST /v1/assets

Create a new asset tokenization request.

**Request Body:**
```json
{
  "issuer": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "metadataCID": "ipfs://QmXxx...",
  "valuation": 1000000,
  "maturity": "2026-12-31",
  "currency": "USD"
}
```

**Response:**
```json
{
  "assetId": 123,
  "status": "custody_pending",
  "custodyRequestId": "req_123",
  "txPending": false
}
```

### KYC & Compliance

#### POST /v1/kyc/submit

Submit KYC verification request.

**Request Body:**
```json
{
  "wallet": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "piiEncryptedCid": "ipfs://QmEncrypted..."
}
```

**Response:**
```json
{
  "status": "pending",
  "attestationId": "att_123",
  "estimated_completion": "24-72 hours"
}
```

#### GET /v1/kyc/status/:wallet

Check KYC verification status.

**Response:**
```json
{
  "wallet": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "status": "verified",
  "verifiedAt": "2024-01-15T10:00:00Z",
  "jurisdiction": "US",
  "expiry": "2025-01-15T10:00:00Z"
}
```

### ZK Proofs

#### POST /v1/zk/generate

Request ZK proof generation.

**Request Body:**
```json
{
  "wallet": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "proofType": "kyc_boolean"
}
```

**Response:**
```json
{
  "proofId": "proof_123",
  "estimatedMs": 30000,
  "status": "queued",
  "queue_position": 1
}
```

#### POST /v1/zk/verify

Verify a ZK proof.

**Request Body:**
```json
{
  "proof": "0xproof...",
  "publicInputs": ["0xinput1", "0xinput2"]
}
```

**Response:**
```json
{
  "isValid": true,
  "verifiedAt": "2024-01-15T10:31:00Z",
  "message": "Proof verified successfully"
}
```

### Custody & Settlement

#### POST /v1/settlement/confirm

Confirm custody settlement for an asset.

**Request Body:**
```json
{
  "assetId": 123,
  "custodianId": "cust_01",
  "fiatAmount": 1000000,
  "receiptSig": "0xsignature..."
}
```

**Response:**
```json
{
  "status": "accepted",
  "bridgeTxHash": "0x1234...abcd",
  "notes": "shares will be minted after bridge tx confirms",
  "receiptId": "rec_123"
}
```

### Oracle & Feeds

#### GET /oracle/prices

Get current price feeds.

**Response:**
```json
{
  "prices": {
    "ETH": { "price": 2500, "timestamp": 1705123456789 },
    "USDC": { "price": 1.00, "timestamp": 1705123456789 },
    "MNT": { "price": 0.85, "timestamp": 1705123456789 }
  },
  "source": "mock-oracle",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Audit Logs

#### GET /v1/audit/logs

Get audit logs with filtering.

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `search` (string): Search term
- `dateFrom` (string): Start date (ISO format)
- `dateTo` (string): End date (ISO format)

**Response:**
```json
{
  "logs": [
    {
      "id": 1,
      "timestamp": "2024-01-15T10:30:00Z",
      "action": "KYC_EXCEPTION_REVIEWED",
      "user": "admin@realyield.com",
      "details": "Approved KYC exception for user 0x1234...abcd",
      "severity": "medium",
      "ipAddress": "192.168.1.100"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 50
}
```

## Error Responses

All endpoints return standard HTTP status codes. Error responses include:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

Common error codes:
- `VALIDATION_ERROR`: Invalid request data
- `UNAUTHORIZED`: Missing or invalid authentication
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per wallet
- Burst limit: 10 requests per second

## Webhooks

The backend supports webhooks for contract events:

**POST /webhooks/contract-events**
```json
{
  "eventType": "AssetMinted",
  "contractAddress": "0x...",
  "transactionHash": "0x...",
  "blockNumber": 12345,
  "args": {
    "assetId": 123,
    "issuer": "0x...",
    "metadataURI": "ipfs://..."
  }
}
```