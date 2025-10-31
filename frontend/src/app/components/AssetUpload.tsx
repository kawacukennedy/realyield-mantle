'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import toast from 'react-hot-toast';

interface AssetUploadProps {
  onUploadComplete?: (cid: string) => void;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
}

export default function AssetUpload({
  onUploadComplete,
  maxSize = 50,
  acceptedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
}: AssetUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [ipfsHash, setIpfsHash] = useState('');
  const [error, setError] = useState<string>('');

  const onDrop = (acceptedFiles: File[], rejectedFiles: any[]) => {
    setError('');

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0].code === 'file-too-large') {
        setError(`File size must be less than ${maxSize}MB`);
      } else if (rejection.errors[0].code === 'file-invalid-type') {
        setError('File type not supported');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSize * 1024 * 1024,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setError('');

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Mock IPFS upload for demo
      await new Promise(resolve => setTimeout(resolve, 3000));

      clearInterval(progressInterval);
      setUploadProgress(100);

      const mockCID = 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';
      setIpfsHash(mockCID);
      onUploadComplete?.(mockCID);

      toast.success('Asset uploaded successfully to IPFS!');

      // Reset after success
      setTimeout(() => {
        setFile(null);
        setUploadProgress(0);
      }, 2000);

    } catch (error) {
      console.error(error);
      setError('Upload failed. Please try again.');
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setIpfsHash('');
    setUploadProgress(0);
    setError('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-text mb-2">Upload Asset Documents</h3>
        <p className="text-text-muted text-sm">
          Securely upload and encrypt your asset documentation to IPFS
        </p>
      </div>

      {!file ? (
        <div {...getRootProps()}>
          <motion.div
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary hover:bg-bg-muted'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload size={48} className={`transition-colors ${isDragActive ? 'text-primary' : 'text-text-muted'}`} />
            </div>
            <div>
              <p className="text-text font-medium mb-1">
                {isDragActive ? 'Drop your file here...' : 'Drag & drop your asset documents'}
              </p>
              <p className="text-sm text-text-muted">or click to browse files</p>
            </div>
            <div className="text-xs text-text-muted space-y-1">
              <p>Supported: PDF, PNG, JPG, DOCX</p>
              <p>Max size: {maxSize}MB</p>
            </div>
          </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-text">{file.name}</p>
                <p className="text-sm text-text-muted">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-bg-muted rounded-full transition-colors"
              disabled={uploading}
            >
              <X size={16} className="text-text-muted" />
            </button>
          </div>

          {uploading && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Uploading to IPFS...</span>
                <span className="text-text">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-bg-muted rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {ipfsHash && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg"
            >
              <CheckCircle size={16} className="text-success" />
              <div>
                <p className="text-sm font-medium text-success">Upload Complete</p>
                <p className="text-xs text-text-muted font-mono">{ipfsHash}</p>
              </div>
            </motion.div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 bg-danger/10 border border-danger/20 rounded-lg">
              <AlertCircle size={16} className="text-danger" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleUpload}
              disabled={uploading || !!ipfsHash}
              className="flex-1"
            >
              {uploading ? 'Uploading...' : ipfsHash ? 'Uploaded' : 'Upload to IPFS'}
            </Button>
            {ipfsHash && (
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(ipfsHash)}>
                Copy CID
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}