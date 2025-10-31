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
  const [uploadProgress, setUploadProgress] = useState(0);
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
      // Mock upload with progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setCid('QmMockCID' + Math.random());
        }
      }, 200);
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
          <input {...registerInfo('title', { required: 'Title is required' })} placeholder="Title" className="w-full p-2 mb-2 bg-panel border rounded" />
          {errorsInfo.title && <p className="text-danger text-sm">{errorsInfo.title.message}</p>}
          <input {...registerInfo('issuerName', { required: 'Issuer Name is required' })} placeholder="Issuer Name" className="w-full p-2 mb-2 bg-panel border rounded" />
          {errorsInfo.issuerName && <p className="text-danger text-sm">{errorsInfo.issuerName.message}</p>}
          <input {...registerInfo('valuation', { required: 'Valuation is required', valueAsNumber: true, min: { value: 0, message: 'Must be positive' } })} type="number" placeholder="Valuation" className="w-full p-2 mb-2 bg-panel border rounded" />
          {errorsInfo.valuation && <p className="text-danger text-sm">{errorsInfo.valuation.message}</p>}
          <input {...registerInfo('maturity', { required: 'Maturity is required' })} type="date" className="w-full p-2 mb-2 bg-panel border rounded" />
          {errorsInfo.maturity && <p className="text-danger text-sm">{errorsInfo.maturity.message}</p>}
          <input {...registerInfo('currency', { required: 'Currency is required' })} placeholder="Currency" className="w-full p-2 mb-4 bg-panel border rounded" />
          {errorsInfo.currency && <p className="text-danger text-sm">{errorsInfo.currency.message}</p>}
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Next</button>
        </form>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-lg mb-4">Upload Docs</h3>
          <div className="mb-4">
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.png,.jpg,.docx"
              className="mb-2"
            />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            {cid && <p className="text-sm text-success">Uploaded successfully! CID: {cid}</p>}
          </div>
          <button onClick={() => setStep(3)} disabled={!cid} className="px-4 py-2 bg-primary text-white rounded">Next</button>
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
          <input {...registerTerms('fees', { required: 'Fees are required', valueAsNumber: true })} type="number" placeholder="Fees (%)" className="w-full p-2 mb-2 bg-panel border rounded" />
          {errorsTerms.fees && <p className="text-danger text-sm">{errorsTerms.fees.message}</p>}
          <input {...registerTerms('yieldSchedule', { required: 'Yield Schedule is required' })} placeholder="Yield Schedule" className="w-full p-2 mb-2 bg-panel border rounded" />
          {errorsTerms.yieldSchedule && <p className="text-danger text-sm">{errorsTerms.yieldSchedule.message}</p>}
          <input {...registerTerms('liquidationPreference', { required: 'Liquidation Preference is required' })} placeholder="Liquidation Preference" className="w-full p-2 mb-4 bg-panel border rounded" />
          {errorsTerms.liquidationPreference && <p className="text-danger text-sm">{errorsTerms.liquidationPreference.message}</p>}
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