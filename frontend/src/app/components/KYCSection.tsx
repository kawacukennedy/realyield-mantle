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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [livenessCheckPassed, setLivenessCheckPassed] = useState(false);
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
           Step {step} of 4: {step === 1 ? 'Upload ID Document' : step === 2 ? 'Liveness Check' : step === 3 ? 'Attestation Signing' : 'Confirmation'}
         </div>
       </div>

       {step === 1 && (
         <div className="space-y-6">
           <div className="text-center mb-6">
             <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-white">
               <User size={32} />
             </div>
             <h3 className="text-xl font-semibold text-text">Upload ID Document</h3>
             <p className="text-text-muted">Upload your government-issued ID for verification (encrypted off-chain)</p>
           </div>
           <div className="space-y-4">
             <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
               <input
                 type="file"
                 accept="image/*,.pdf"
                 onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                 className="hidden"
                 id="id-upload"
               />
               <label htmlFor="id-upload" className="cursor-pointer">
                 <div className="w-16 h-16 bg-bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                   <User size={32} className="text-text-muted" />
                 </div>
                 <p className="text-text mb-2">Click to upload or drag and drop</p>
                 <p className="text-sm text-text-muted">Supported formats: JPG, PNG, PDF (max 10MB)</p>
               </label>
             </div>
             {uploadedFile && (
               <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
                 <p className="text-success font-medium">✓ {uploadedFile.name}</p>
                 <p className="text-sm text-text-muted">File uploaded successfully. Data will be encrypted before storage.</p>
               </div>
             )}
           </div>
           <Button
             onClick={() => setStep(2)}
             disabled={!uploadedFile}
             className="w-full"
           >
             Continue to Liveness Check
           </Button>
         </div>
       )}

       {step === 2 && (
         <div className="space-y-6">
           <div className="text-center mb-6">
             <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white">
               <Shield size={32} />
             </div>
             <h3 className="text-xl font-semibold text-text">Liveness Check</h3>
             <p className="text-text-muted">Complete the biometric verification (simulated)</p>
           </div>
           <div className="bg-bg-muted p-8 rounded-xl border border-border text-center">
             <div className="w-32 h-32 bg-bg-card rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-primary/20">
               <User size={48} className="text-text-muted" />
             </div>
             <p className="text-text-muted mb-4">Position your face in the center of the circle</p>
             <p className="text-sm text-text-muted">This is a simulated liveness check for demo purposes</p>
           </div>
           <div className="flex space-x-4">
             <Button
               onClick={() => {
                 setLivenessCheckPassed(false);
                 setStep(3);
               }}
               variant="outline"
               className="flex-1"
             >
               Skip (Demo)
             </Button>
             <Button
               onClick={() => {
                 setLivenessCheckPassed(true);
                 setStep(3);
               }}
               className="flex-1"
             >
               Complete Check
             </Button>
           </div>
         </div>
       )}

       {step === 3 && (
         <div className="space-y-6">
           <div className="text-center mb-6">
             <div className="w-16 h-16 bg-gradient-to-r from-accent to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white">
               <CheckSquare size={32} />
             </div>
             <h3 className="text-xl font-semibold text-text">Attestation Signing</h3>
             <p className="text-text-muted">Backend signs JWT bound to your wallet public key</p>
           </div>
           <div className="bg-bg-muted p-6 rounded-xl border border-border">
             <h4 className="font-semibold text-text mb-3">JWT Attestation Details</h4>
             <div className="space-y-3 text-sm">
               <div className="flex justify-between">
                 <span className="text-text-muted">Wallet Address:</span>
                 <span className="text-text font-mono">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-text-muted">KYC Status:</span>
                 <span className="text-success">Verified</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-text-muted">Liveness Check:</span>
                 <span className={livenessCheckPassed ? 'text-success' : 'text-warning'}>
                   {livenessCheckPassed ? 'Passed' : 'Skipped (Demo)'}
                 </span>
               </div>
               <div className="flex justify-between">
                 <span className="text-text-muted">Expiry:</span>
                 <span className="text-text">1 Year</span>
               </div>
             </div>
           </div>
           <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
             <p className="text-sm text-yellow-600 dark:text-yellow-400">
               <strong>Note:</strong> In production, this JWT would be signed by the backend and bound to your wallet's public key for secure verification.
             </p>
           </div>
           <Button onClick={() => setStep(4)} className="w-full">
             Sign Attestation
           </Button>
         </div>
       )}

       {step === 4 && (
         <div className="space-y-6">
           <div className="text-center mb-6">
             <div className="w-16 h-16 bg-gradient-to-r from-success to-success/80 rounded-full mx-auto mb-4 flex items-center justify-center text-white">
               <Shield size={32} />
             </div>
             <h3 className="text-xl font-semibold text-text">Confirmation</h3>
             <p className="text-text-muted">Hash of attestation stored on Mantle</p>
           </div>
           <div className="bg-success/10 border border-success/20 p-6 rounded-xl">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                 <CheckSquare size={20} className="text-white" />
               </div>
               <div>
                 <h4 className="font-semibold text-success">KYC Verification Complete</h4>
                 <p className="text-sm text-text-muted">Your attestation hash has been stored on Mantle</p>
               </div>
             </div>
             <div className="space-y-2 text-sm">
               <div className="flex justify-between">
                 <span className="text-text-muted">Transaction Hash:</span>
                 <span className="text-text font-mono">0x{Math.random().toString(16).substr(2, 64)}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-text-muted">Block Number:</span>
                 <span className="text-text">{Math.floor(Math.random() * 1000000)}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-text-muted">Attestation Hash:</span>
                 <span className="text-text font-mono">0x{Math.random().toString(16).substr(2, 64)}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-text-muted">Status:</span>
                 <span className="text-success font-medium">Confirmed</span>
               </div>
             </div>
             <div className="mt-4 p-3 bg-bg-card rounded-lg border border-border">
               <p className="text-xs text-text-muted">
                 Your wallet is now flagged as KYC-verified. This proof can be reused to deposit or withdraw from any RealYield vault.
               </p>
             </div>
           </div>
           <Button onClick={() => window.location.href = '/dashboard'} className="w-full">
             Go to Dashboard
           </Button>
         </div>
       )}
    </div>
  );
}