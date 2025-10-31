'use client';

import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import DataTable from './DataTable';

interface KYCException {
  id: string;
  user: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface CustodyRequest {
  id: string;
  assetId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AdminPanel() {
  const [kycExceptions, setKycExceptions] = useState<KYCException[]>([
    { id: '1', user: '0x123...', reason: 'Expired ID', status: 'pending' },
  ]);
  const [custodyRequests, setCustodyRequests] = useState<CustodyRequest[]>([
    { id: '1', assetId: 'asset-1', amount: 1000, status: 'pending' },
  ]);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [oracleUpdate, setOracleUpdate] = useState('');

  const handleKYCAction = (id: string, action: 'approve' | 'reject') => {
    setKycExceptions(prev =>
      prev.map(exc => exc.id === id ? { ...exc, status: action === 'approve' ? 'approved' : 'rejected' } : exc)
    );
  };

  const handleCustodyAction = (id: string, action: 'approve' | 'reject') => {
    setCustodyRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' } : req)
    );
  };

  const handleEmergencyPause = () => {
    // Call contract to pause
    alert('Emergency pause activated');
    setShowEmergencyModal(false);
  };

  const handleOracleUpdate = () => {
    // Push oracle update
    alert('Oracle updated');
    setOracleUpdate('');
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      {/* KYC Exceptions */}
      <div className="bg-panel p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">KYC Exceptions</h3>
        <DataTable
          columns={[
            { key: 'user', header: 'User' },
            { key: 'reason', header: 'Reason' },
            { key: 'status', header: 'Status' },
            { key: 'actions', header: 'Actions' },
          ]}
          data={kycExceptions.map(exc => ({
            ...exc,
            actions: (
              <div className="space-x-2">
                <Button size="sm" onClick={() => handleKYCAction(exc.id, 'approve')}>Approve</Button>
                <Button size="sm" variant="outline" onClick={() => handleKYCAction(exc.id, 'reject')}>Reject</Button>
              </div>
            ),
          }))}
        />
      </div>

      {/* Custody Settlement Requests */}
      <div className="bg-panel p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Custody Settlement Requests</h3>
        <DataTable
          columns={[
            { key: 'assetId', header: 'Asset ID' },
            { key: 'amount', header: 'Amount' },
            { key: 'status', header: 'Status' },
            { key: 'actions', header: 'Actions' },
          ]}
          data={custodyRequests.map(req => ({
            ...req,
            actions: (
              <div className="space-x-2">
                <Button size="sm" onClick={() => handleCustodyAction(req.id, 'approve')}>Approve</Button>
                <Button size="sm" variant="outline" onClick={() => handleCustodyAction(req.id, 'reject')}>Reject</Button>
              </div>
            ),
          }))}
        />
      </div>

      {/* Emergency Controls */}
      <div className="bg-panel p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Emergency Controls</h3>
        <Button variant="outline" onClick={() => setShowEmergencyModal(true)}>
          Emergency Pause
        </Button>
      </div>

      {/* Oracle Updates */}
      <div className="bg-panel p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Oracle Updates</h3>
        <div className="flex space-x-4">
          <Input
            placeholder="New oracle value"
            value={oracleUpdate}
            onChange={(e) => setOracleUpdate(e.target.value)}
          />
          <Button onClick={handleOracleUpdate}>Update Oracle</Button>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-panel p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Audit Logs</h3>
        <Button variant="outline">Export CSV</Button>
      </div>

      {/* Emergency Modal */}
      <Modal isOpen={showEmergencyModal} onClose={() => setShowEmergencyModal(false)} title="Emergency Pause">
        <p className="mb-4">Are you sure you want to activate emergency pause? This will halt all operations.</p>
        <div className="flex justify-end space-x-4">
          <Button variant="ghost" onClick={() => setShowEmergencyModal(false)}>Cancel</Button>
          <Button variant="outline" onClick={handleEmergencyPause}>Confirm</Button>
        </div>
      </Modal>
    </div>
  );
}