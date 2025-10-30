'use client';

import { useState } from 'react';

export default function AssetUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      // Mock IPFS upload for demo
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload time
      const mockCID = 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';
      setIpfsHash(mockCID);
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