'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';

export default function KYCOnboardingFlow() {
  const { address } = useAccount();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [attestation, setAttestation] = useState<any>(null);

  const handleProfile = () => {
    setStep(2);
  };

  const handleKYCForm = async () => {
    setLoading(true);
    // Mock KYC validation
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const handleConsent = () => {
    setStep(4);
  };

  const handleAttestation = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/kyc/submit', {
        walletPubKey: address,
        piiEncrypted: 'mock-encrypted-pii',
      });
      setAttestation(response.data.attestation);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-6">KYC Onboarding</h2>

      {step === 1 && (
        <div>
          <h3 className="text-lg mb-4">Profile Creation</h3>
          <input placeholder="Email" className="w-full p-2 mb-4 bg-panel border rounded" />
          <button onClick={handleProfile} className="px-4 py-2 bg-primary text-white rounded">Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-lg mb-4">KYC Form</h3>
          <p className="mb-4">PII collected here</p>
          <button onClick={handleKYCForm} disabled={loading} className="px-4 py-2 bg-primary text-white rounded">
            {loading ? 'Validating...' : 'Submit KYC'}
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-lg mb-4">Consent & Data Retention</h3>
          <p className="mb-4">Agree to terms</p>
          <button onClick={handleConsent} className="px-4 py-2 bg-primary text-white rounded">Agree</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 className="text-lg mb-4">Attestation Issuance</h3>
          <button onClick={handleAttestation} disabled={loading} className="px-4 py-2 bg-primary text-white rounded">
            {loading ? 'Issuing...' : 'Get Attestation'}
          </button>
          {attestation && (
            <div className="mt-4 p-4 bg-panel rounded">
              <p>Expiry: {attestation.expiry}</p>
              <p>Jurisdiction: {attestation.jurisdiction}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}