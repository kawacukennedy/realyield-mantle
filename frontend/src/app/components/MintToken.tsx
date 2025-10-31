'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWriteContract } from 'wagmi';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { Upload, FileText, CheckCircle } from 'lucide-react';

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

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false,
  });

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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Asset Title</label>
              <input
                {...registerInfo('title', { required: 'Title is required' })}
                placeholder="Enter asset title"
                className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              {errorsInfo.title && <p className="text-danger text-sm mt-1">{errorsInfo.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Issuer Name</label>
              <input
                {...registerInfo('issuerName', { required: 'Issuer Name is required' })}
                placeholder="Enter issuer name"
                className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              {errorsInfo.issuerName && <p className="text-danger text-sm mt-1">{errorsInfo.issuerName.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">Valuation ($)</label>
                <input
                  {...registerInfo('valuation', { required: 'Valuation is required', valueAsNumber: true, min: { value: 0, message: 'Must be positive' } })}
                  type="number"
                  placeholder="1000000"
                  className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                {errorsInfo.valuation && <p className="text-danger text-sm mt-1">{errorsInfo.valuation.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Currency</label>
                <input
                  {...registerInfo('currency', { required: 'Currency is required' })}
                  placeholder="USD"
                  className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                {errorsInfo.currency && <p className="text-danger text-sm mt-1">{errorsInfo.currency.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Maturity Date</label>
              <input
                {...registerInfo('maturity', { required: 'Maturity is required' })}
                type="date"
                className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              {errorsInfo.maturity && <p className="text-danger text-sm mt-1">{errorsInfo.maturity.message}</p>}
            </div>
          </div>
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Next</button>
        </form>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-lg mb-4">Upload Docs</h3>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive ? 'border-primary bg-primary/5 scale-105' : 'border-border hover:border-primary hover:bg-bg-muted'
            }`}
          >
            <input {...getInputProps()} />
            {docs ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <FileText size={48} className="text-primary" />
                </div>
                <div>
                  <p className="text-text font-medium">{docs.name}</p>
                  <p className="text-sm text-text-muted">{(docs.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-bg-muted rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
                {cid && (
                  <div className="flex items-center justify-center gap-2 text-success">
                    <CheckCircle size={20} />
                    <span className="text-sm font-medium">Uploaded successfully!</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Upload size={48} className="text-text-muted" />
                </div>
                <div>
                  <p className="text-text font-medium mb-1">
                    {isDragActive ? 'Drop the file here...' : 'Drag & drop your asset documents'}
                  </p>
                  <p className="text-sm text-text-muted">or click to browse files</p>
                </div>
                <p className="text-xs text-text-muted">Supported: PDF, PNG, JPG, DOCX (max 50MB)</p>
              </div>
            )}
          </div>
          <button onClick={() => setStep(3)} disabled={!cid} className="px-4 py-2 bg-primary text-white rounded mt-4">Next</button>
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Fees (%)</label>
              <input
                {...registerTerms('fees', { required: 'Fees are required', valueAsNumber: true })}
                type="number"
                step="0.01"
                placeholder="2.5"
                className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              {errorsTerms.fees && <p className="text-danger text-sm mt-1">{errorsTerms.fees.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Yield Schedule</label>
              <textarea
                {...registerTerms('yieldSchedule', { required: 'Yield Schedule is required' })}
                placeholder="Describe the yield distribution schedule..."
                rows={3}
                className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
              />
              {errorsTerms.yieldSchedule && <p className="text-danger text-sm mt-1">{errorsTerms.yieldSchedule.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Liquidation Preference</label>
              <input
                {...registerTerms('liquidationPreference', { required: 'Liquidation Preference is required' })}
                placeholder="e.g., 1x preferred return"
                className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              {errorsTerms.liquidationPreference && <p className="text-danger text-sm mt-1">{errorsTerms.liquidationPreference.message}</p>}
            </div>
          </div>
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