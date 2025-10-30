'use client';

import { useState } from 'react';
import { Web3Storage } from 'web3.storage';

const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN || '' });

export default function AssetUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const cid = await client.put([file]);
      setIpfsHash(cid);
    } catch (error) {
      console.error(error);
    }
    setUploading(false);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Upload Asset to IPFS</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload to IPFS'}
      </button>
      {ipfsHash && <p>IPFS CID: {ipfsHash}</p>}
    </div>
  );
}