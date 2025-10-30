'use client';

import { useForm } from 'react-hook-form';
import { useWriteContract } from 'wagmi';
import toast from 'react-hot-toast';

// Mock contract ABI and address
const assetTokenizerAddress = '0x...'; // Replace with deployed address
const assetTokenizerAbi = [
  // Add ABI here
];

type FormData = {
  metadataURI: string;
  amount: number;
};

export default function MintToken() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();

  const onSubmit = (data: FormData) => {
    writeContract({
      address: assetTokenizerAddress,
      abi: assetTokenizerAbi,
      functionName: 'mintAsset',
      args: ['0x...', data.amount, data.metadataURI, '0x...', '0x...'], // Mock args
    });
  };

  if (isSuccess) {
    toast.success('Token minted successfully!');
  }

  if (isError) {
    toast.error('Minting failed!');
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Mint Asset Token</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('metadataURI', { required: 'Metadata URI is required' })}
          type="text"
          placeholder="Metadata URI"
          className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
        />
        {errors.metadataURI && <p className="text-red-500 text-sm">{errors.metadataURI.message}</p>}
        <input
          {...register('amount', { required: 'Amount is required', min: { value: 1, message: 'Amount must be at least 1' } })}
          type="number"
          placeholder="Amount"
          className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {isPending ? 'Minting...' : 'Mint Token'}
        </button>
      </form>
    </div>
  );
}