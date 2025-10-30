'use client';

import { useState } from 'react';
import axios from 'axios';

export default function AssetUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    // Mock IPFS upload
    const formData = new FormData();
    formData.append('file', file);
    try {
      // In real, use IPFS API
      const response = await axios.post('http://localhost:3001/data/store', { data: 'mock-data' });
      setIpfsHash('mock-ipfs-hash');
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
        disabled={uploading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
    </div>
  );
}