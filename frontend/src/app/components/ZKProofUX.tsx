'use client';

import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import ProgressStepper from './ProgressStepper';

interface ZKProofUXProps {
  onProofGenerated?: (proof: any) => void;
}

export default function ZKProofUX({ onProofGenerated }: ZKProofUXProps) {
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [proof, setProof] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { label: 'Request', completed: step > 0 },
    { label: 'Generate', completed: step > 1 },
    { label: 'Verify', completed: step > 2 },
    { label: 'Submit', completed: step > 3 },
  ];

  const handleRequestProof = () => {
    setStep(1);
    setIsGenerating(true);
    setError(null);

    // Simulate proof generation
    setTimeout(() => {
      setIsGenerating(false);
      setStep(2);
      setProof({ mock: 'proof-data' });
    }, 30000); // 30 seconds
  };

  const handlePreVerify = () => {
    // Simulate verification
    setStep(3);
  };

  const handleSubmitProof = () => {
    // Submit to contract
    onProofGenerated?.(proof);
    setStep(4);
  };

  const handleRetry = () => {
    setStep(0);
    setProof(null);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">ZK Proof Generation</h2>

      <ProgressStepper steps={steps} currentStep={step} />

      <div className="mt-8">
        {step === 0 && (
          <div className="text-center">
            <p className="mb-4 text-muted">
              Generate a zero-knowledge proof to verify your eligibility without revealing sensitive information.
            </p>
            <p className="mb-6 text-sm text-muted">
              This proof will only reveal that you meet the criteria, not your personal data.
            </p>
            <Button onClick={handleRequestProof}>Generate Proof</Button>
          </div>
        )}

        {step === 1 && (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="mb-2">Generating privacy proof...</p>
            <p className="text-sm text-muted">Estimated time: 30 seconds</p>
            <p className="text-sm text-muted mt-2">Cost: ~0.01 ETH</p>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-success rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">✓</div>
            <p className="mb-4">Proof generated successfully!</p>
            <p className="text-sm text-muted mb-6">
              Server-side verification passed. Ready to submit to blockchain.
            </p>
            <Button onClick={handlePreVerify}>Continue</Button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <p className="mb-4">Pre-verification complete.</p>
            <p className="text-sm text-muted mb-6">
              Your proof is valid and ready for on-chain submission.
            </p>
            <Button onClick={handleSubmitProof}>Submit Proof</Button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-success rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">✓</div>
            <p className="mb-4">Proof submitted successfully!</p>
            <p className="text-sm text-muted mb-6">
              Your action has been permitted. Transaction confirmed.
            </p>
            <Button onClick={handleRetry}>Generate Another Proof</Button>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="text-danger mb-4">{error}</p>
            <Button onClick={handleRetry}>Retry</Button>
          </div>
        )}
      </div>
    </div>
  );
}