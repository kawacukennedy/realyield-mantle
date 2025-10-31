'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWriteContract } from 'wagmi';
import toast from 'react-hot-toast';

// Mock contract ABI and address
const assetTokenizerAddress = '0x...'; // Replace with deployed address
const assetTokenizerAbi: readonly any[] = [
  // Add ABI here
];

type AssetInfo = {
  title: string;
  issuerName: string;
  valuation: number;
  maturity: string;
  currency: string;
};

type Terms = {
  fees: number;
  yieldSchedule: string;
  liquidationPreference: string;
};

export default function CreateAssetWizard() {
  const [step, setStep] = useState(1);
  const [assetInfo, setAssetInfo] = useState<AssetInfo | null>(null);
  const [docs, setDocs] = useState<File | null>(null);
  const [cid, setCid] = useState<string>('');
  const [terms, setTerms] = useState<Terms | null>(null);

  const { register: registerInfo, handleSubmit: handleSubmitInfo, formState: { errors: errorsInfo } } = useForm<AssetInfo>();
  const { register: registerTerms, handleSubmit: handleSubmitTerms, formState: { errors: errorsTerms } } = useForm<Terms>();
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();

  const onSubmitInfo = (data: AssetInfo) => {
    setAssetInfo(data);
    setStep(2);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocs(file);
      // Mock IPFS upload
      setCid('QmMockCID' + Math.random());
    }
  };

  const onSubmitTerms = (data: Terms) => {
    setTerms(data);
    setStep(5);
  };

  const handleMint = () => {
    if (!assetInfo || !cid) return;
    writeContract({
      address: assetTokenizerAddress,
      abi: assetTokenizerAbi,
      functionName: 'mintAsset',
      args: [cid, '0x...', '0x...', assetInfo.valuation, Math.floor(new Date(assetInfo.maturity).getTime() / 1000)],
    });
  };

  if (isSuccess) {
    toast.success('Asset minted successfully!');
  }

  if (isError) {
    toast.error('Minting failed!');
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl mb-6">Create Asset Wizard</h2>
      <div className="mb-6">
        <div className="flex justify-between">
          {[1,2,3,4,5].map(s => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= s ? 'bg-primary' : 'bg-muted'} text-white`}>
              {s}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <form onSubmit={handleSubmitInfo(onSubmitInfo)}>
          <h3 className="text-lg mb-4">Asset Info</h3>
          <input {...registerInfo('title', { required: true })} placeholder="Title" className="w-full p-2 mb-2 bg-panel border rounded" />
          <input {...registerInfo('issuerName', { required: true })} placeholder="Issuer Name" className="w-full p-2 mb-2 bg-panel border rounded" />
          <input {...registerInfo('valuation', { required: true, valueAsNumber: true })} type="number" placeholder="Valuation" className="w-full p-2 mb-2 bg-panel border rounded" />
          <input {...registerInfo('maturity', { required: true })} type="date" className="w-full p-2 mb-2 bg-panel border rounded" />
          <input {...registerInfo('currency', { required: true })} placeholder="Currency" className="w-full p-2 mb-4 bg-panel border rounded" />
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Next</button>
        </form>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-lg mb-4">Upload Docs</h3>
          <input type="file" onChange={handleFileUpload} className="mb-4" />
          {cid && <p className="text-sm text-muted">CID: {cid}</p>}
          <button onClick={() => setStep(3)} className="px-4 py-2 bg-primary text-white rounded">Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-lg mb-4">Custody Settlement Request</h3>
          <p className="mb-4">Simulate custodian confirmation</p>
          <button onClick={() => setStep(4)} className="px-4 py-2 bg-primary text-white rounded">Request Settlement</button>
        </div>
      )}

      {step === 4 && (
        <form onSubmit={handleSubmitTerms(onSubmitTerms)}>
          <h3 className="text-lg mb-4">Terms</h3>
          <input {...registerTerms('fees', { required: true, valueAsNumber: true })} type="number" placeholder="Fees" className="w-full p-2 mb-2 bg-panel border rounded" />
          <input {...registerTerms('yieldSchedule', { required: true })} placeholder="Yield Schedule" className="w-full p-2 mb-2 bg-panel border rounded" />
          <input {...registerTerms('liquidationPreference', { required: true })} placeholder="Liquidation Preference" className="w-full p-2 mb-4 bg-panel border rounded" />
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Next</button>
        </form>
      )}

      {step === 5 && (
        <div>
          <h3 className="text-lg mb-4">Review & Sign</h3>
          <p>Asset: {assetInfo?.title}</p>
          <p>Valuation: {assetInfo?.valuation}</p>
          <p>CID: {cid}</p>
          <button onClick={handleMint} disabled={isPending} className="px-4 py-2 bg-primary text-white rounded">
            {isPending ? 'Minting...' : 'Mint Asset'}
          </button>
        </div>
      )}
    </div>
  );
}