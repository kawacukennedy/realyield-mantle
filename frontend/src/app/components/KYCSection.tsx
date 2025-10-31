'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Mail, Calendar, MapPin, CheckSquare, Shield } from 'lucide-react';
import Button from './Button';

type ProfileForm = {
  email: string;
  name: string;
};

type KYCForm = {
  dob: string;
  address: string;
};

export default function KYCOnboardingFlow() {
  const { address } = useAccount();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [attestation, setAttestation] = useState<any>(null);
  const [consent, setConsent] = useState(false);

  const { register: registerProfile, handleSubmit: handleSubmitProfile, formState: { errors: errorsProfile } } = useForm<ProfileForm>();
  const { register: registerKYC, handleSubmit: handleSubmitKYC, formState: { errors: errorsKYC } } = useForm<KYCForm>();

  const onSubmitProfile = (data: ProfileForm) => {
    setStep(2);
  };

  const onSubmitKYC = async (data: KYCForm) => {
    setLoading(true);
    // Mock KYC validation
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      toast.success('KYC validation completed successfully!');
    }, 2000);
  };

  const handleConsent = () => {
    if (consent) {
      setStep(4);
    }
  };

  const handleAttestation = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kyc/submit`, {
        walletPubKey: address,
        piiEncrypted: 'mock-encrypted-pii',
      });
      setAttestation(response.data.attestation);
      setLoading(false);
      toast.success('Attestation issued successfully!');
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Failed to issue attestation');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">KYC Onboarding</h2>
        <p className="text-text-muted">Complete your identity verification to access RealYield vaults</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {[1,2,3,4].map(s => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              step >= s ? 'bg-primary text-white' : 'bg-bg-muted text-text-muted'
            }`}>
              {s}
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-text-muted text-center">
          Step {step} of 4: {step === 1 ? 'Profile' : step === 2 ? 'Verification' : step === 3 ? 'Consent' : 'Attestation'}
        </div>
      </div>

      {step === 1 && (
        <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-white">
              <User size={32} />
            </div>
            <h3 className="text-xl font-semibold text-text">Create Your Profile</h3>
            <p className="text-text-muted">Start by providing your basic information</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              <input
                {...registerProfile('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                })}
                placeholder="your@email.com"
                className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              {errorsProfile.email && <p className="text-danger text-sm mt-1">{errorsProfile.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2">
                <User size={16} />
                Full Name
              </label>
              <input
                {...registerProfile('name', { required: 'Full name is required' })}
                placeholder="John Doe"
                className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              {errorsProfile.name && <p className="text-danger text-sm mt-1">{errorsProfile.name.message}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full">Continue to Verification</Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmitKYC(onSubmitKYC)} className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-semibold text-text">Identity Verification</h3>
            <p className="text-text-muted">Provide additional details for KYC compliance</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2">
                <Calendar size={16} />
                Date of Birth
              </label>
              <input
                {...registerKYC('dob', { required: 'Date of birth is required' })}
                type="date"
                className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              {errorsKYC.dob && <p className="text-danger text-sm mt-1">{errorsKYC.dob.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Residential Address
              </label>
              <input
                {...registerKYC('address', { required: 'Address is required' })}
                placeholder="123 Main St, City, State, ZIP"
                className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              {errorsKYC.address && <p className="text-danger text-sm mt-1">{errorsKYC.address.message}</p>}
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Validating...' : 'Submit for Verification'}
          </Button>
        </form>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-accent to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white">
              <CheckSquare size={32} />
            </div>
            <h3 className="text-xl font-semibold text-text">Data Consent</h3>
            <p className="text-text-muted">Review and accept our data processing terms</p>
          </div>
          <div className="bg-bg-muted p-6 rounded-xl border border-border">
            <h4 className="font-semibold text-text mb-3">Data Processing Agreement</h4>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              By proceeding, you consent to the collection and processing of your personal data for KYC purposes.
              Your information will be encrypted and stored securely for regulatory compliance.
              Data will be retained only as required by law and deleted upon your request.
            </p>
            <div className="bg-bg-card p-4 rounded-lg border border-border-light">
              <p className="text-xs text-text-muted">
                <strong>Key Points:</strong><br />
                • Data is encrypted at rest and in transit<br />
                • Used only for identity verification and compliance<br />
                • Retained for minimum 5 years per regulations<br />
                • Can be deleted upon written request
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 text-primary bg-bg-card border-border rounded focus:ring-primary focus:ring-2"
            />
            <label htmlFor="consent" className="text-sm text-text cursor-pointer">
              I have read and agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              I consent to the collection and processing of my personal data for KYC verification purposes.
            </label>
          </div>
          <Button onClick={handleConsent} disabled={!consent} className="w-full">
            Accept & Continue
          </Button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-success to-success/80 rounded-full mx-auto mb-4 flex items-center justify-center text-white">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-semibold text-text">ZK Attestation</h3>
            <p className="text-text-muted">Generate your zero-knowledge proof attestation</p>
          </div>
          {!attestation ? (
            <div className="text-center">
              <p className="text-text-muted mb-6">
                Your attestation will prove your KYC compliance without revealing personal details.
              </p>
              <Button onClick={handleAttestation} disabled={loading} size="lg">
                {loading ? 'Generating Attestation...' : 'Generate ZK Attestation'}
              </Button>
            </div>
          ) : (
            <div className="bg-success/10 border border-success/20 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                  <CheckSquare size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-success">Attestation Generated</h4>
                  <p className="text-sm text-text-muted">Your ZK proof is ready</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Expiry:</span>
                  <span className="text-text">{attestation.expiry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Jurisdiction:</span>
                  <span className="text-text">{attestation.jurisdiction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Status:</span>
                  <span className="text-success font-medium">Active</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-bg-card rounded-lg border border-border">
                <p className="text-xs text-text-muted font-mono break-all">
                  {attestation.proof || '0x' + Math.random().toString(16).substr(2, 64)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}