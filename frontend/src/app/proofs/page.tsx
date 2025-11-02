'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ZKProofUX from '../components/ZKProofUX';
import Breadcrumb from '../components/Breadcrumb';

// Mock data
const mockProofs = [
  {
    id: 'proof_001',
    type: 'withdrawal',
    status: 'verified',
    createdAt: '2024-01-15T10:30:00Z',
    verifiedAt: '2024-01-15T10:31:00Z',
    txHash: '0x1234...abcd',
    disclosedFields: ['kyc_status', 'balance_check']
  },
  {
    id: 'proof_002',
    type: 'deposit',
    status: 'pending',
    createdAt: '2024-01-14T15:20:00Z',
    disclosedFields: ['kyc_status']
  },
  {
    id: 'proof_003',
    type: 'withdrawal',
    status: 'verified',
    createdAt: '2024-01-13T09:15:00Z',
    verifiedAt: '2024-01-13T09:16:00Z',
    txHash: '0x5678...efgh',
    disclosedFields: ['kyc_status', 'balance_check', 'jurisdiction']
  }
];

export default function ProofsPage() {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedProof, setSelectedProof] = useState<any>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning" />;
      default:
        return <AlertCircle className="h-5 w-5 text-danger" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'pending':
        return 'Pending';
      default:
        return 'Failed';
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text p-6">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'ZK Proof Manager' }
      ]} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">ZK Proof Manager</h1>
            <p className="text-text-muted">Generate and manage your zero-knowledge proofs</p>
          </div>
          <Button onClick={() => setShowGenerateModal(true)} className="bg-gradient-to-r from-primary to-accent">
            <Plus className="mr-2 h-4 w-4" />
            Generate Proof
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-success" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">{mockProofs.filter(p => p.status === 'verified').length}</p>
                  <p className="text-text-muted">Verified Proofs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-warning" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">{mockProofs.filter(p => p.status === 'pending').length}</p>
                  <p className="text-text-muted">Pending Proofs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">{mockProofs.length}</p>
                  <p className="text-text-muted">Total Proofs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proofs List */}
        <Card>
          <CardHeader>
            <CardTitle>Proof History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProofs.map((proof, index) => (
                <motion.div
                  key={proof.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-bg-muted rounded-lg hover:bg-bg-card transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(proof.status)}
                    <div>
                      <p className="font-medium">Proof {proof.id}</p>
                      <p className="text-sm text-text-muted">
                        {proof.type.charAt(0).toUpperCase() + proof.type.slice(1)} •
                        Created {new Date(proof.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      proof.status === 'verified'
                        ? 'bg-success/10 text-success'
                        : proof.status === 'pending'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-danger/10 text-danger'
                    }`}>
                      {getStatusText(proof.status)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProof(proof)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate Proof Modal */}
      <Modal isOpen={showGenerateModal} onClose={() => setShowGenerateModal(false)} title="Generate ZK Proof">
        <ZKProofUX onProofGenerated={() => setShowGenerateModal(false)} />
      </Modal>

      {/* Proof Details Modal */}
      <Modal isOpen={!!selectedProof} onClose={() => setSelectedProof(null)} title="Proof Details">
        {selectedProof && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Proof ID</label>
                <p className="font-mono text-sm">{selectedProof.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Type</label>
                <p className="capitalize">{selectedProof.type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Status</label>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedProof.status)}
                  <span>{getStatusText(selectedProof.status)}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Created</label>
                <p>{new Date(selectedProof.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {selectedProof.verifiedAt && (
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Verified At</label>
                <p>{new Date(selectedProof.verifiedAt).toLocaleString()}</p>
              </div>
            )}

            {selectedProof.txHash && (
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Transaction Hash</label>
                <p className="font-mono text-sm break-all">{selectedProof.txHash}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Disclosed Fields</label>
              <div className="flex flex-wrap gap-2">
                {selectedProof.disclosedFields.map((field: string) => (
                  <span key={field} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                    {field.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}