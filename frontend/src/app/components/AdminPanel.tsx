'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  FileText,
  Calendar,
  Filter,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Users,
  DollarSign
} from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import DataTable from './DataTable';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import Badge from './Badge';

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

interface AuditLog {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'kyc' | 'custody' | 'audit' | 'system'>('overview');
  const [kycExceptions, setKycExceptions] = useState<KYCException[]>([
    { id: '1', user: '0x1234...abcd', reason: 'Expired ID', status: 'pending' },
    { id: '2', user: '0x5678...efgh', reason: 'Incomplete documentation', status: 'pending' },
  ]);
  const [custodyRequests, setCustodyRequests] = useState<CustodyRequest[]>([
    { id: '1', assetId: 'asset-1', amount: 10000, status: 'pending' },
    { id: '2', assetId: 'asset-2', amount: 5000, status: 'approved' },
  ]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      action: 'KYC_EXCEPTION_REVIEWED',
      user: 'admin@realyield.com',
      details: 'Approved KYC exception for user 0x1234...abcd',
      severity: 'medium',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      action: 'CUSTODY_SETTLEMENT_APPROVED',
      user: 'admin@realyield.com',
      details: 'Approved custody settlement for asset asset-1 ($10,000)',
      severity: 'high',
      ipAddress: '192.168.1.100'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      action: 'EMERGENCY_PAUSE_ACTIVATED',
      user: 'admin@realyield.com',
      details: 'Emergency pause activated due to system maintenance',
      severity: 'critical',
      ipAddress: '192.168.1.100'
    }
  ]);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [oracleUpdate, setOracleUpdate] = useState('');
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'json'>('csv');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchTerm, setSearchTerm] = useState('');

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'kyc', label: 'KYC Management', icon: Users },
    { id: 'custody', label: 'Custody', icon: DollarSign },
    { id: 'audit', label: 'Audit Logs', icon: FileText },
    { id: 'system', label: 'System', icon: AlertTriangle }
  ];

  const handleExportAuditLogs = async () => {
    try {
      let dataToExport = auditLogs;

      // Apply date filter
      if (dateRange.start && dateRange.end) {
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        dataToExport = dataToExport.filter(log =>
          log.timestamp >= startDate && log.timestamp <= endDate
        );
      }

      // Apply search filter
      if (searchTerm) {
        dataToExport = dataToExport.filter(log =>
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.user.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (exportFormat === 'csv') {
        const csvContent = [
          ['Timestamp', 'Action', 'User', 'Details', 'Severity', 'IP Address'],
          ...dataToExport.map(log => [
            log.timestamp.toISOString(),
            log.action,
            log.user,
            log.details,
            log.severity,
            log.ipAddress
          ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (exportFormat === 'json') {
        const jsonContent = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      // PDF export would require a library like jsPDF
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'primary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-bg-muted p-1 rounded-lg">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-bg-card text-primary shadow-sm'
                  : 'text-text-muted hover:text-text hover:bg-bg-card/50'
              }`}
            >
              <IconComponent size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Users size={24} className="text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-text">1,247</p>
                    <p className="text-sm text-text-muted">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <DollarSign size={24} className="text-success" />
                  <div>
                    <p className="text-2xl font-bold text-text">$2.4M</p>
                    <p className="text-sm text-text-muted">TVL</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle size={24} className="text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-text">23</p>
                    <p className="text-sm text-text-muted">Active Vaults</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={24} className="text-warning" />
                  <div>
                    <p className="text-2xl font-bold text-text">3</p>
                    <p className="text-sm text-text-muted">Pending Reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'kyc' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                KYC Exception Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { key: 'user', header: 'User Address' },
                  { key: 'reason', header: 'Reason' },
                  { key: 'status', header: 'Status' },
                  { key: 'actions', header: 'Actions' },
                ]}
                data={kycExceptions.map(exc => ({
                  ...exc,
                  status: <Badge variant={exc.status === 'approved' ? 'success' : exc.status === 'rejected' ? 'danger' : 'warning'}>{exc.status}</Badge>,
                  actions: exc.status === 'pending' ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleKYCAction(exc.id, 'approve')}>
                        <CheckCircle size={14} className="mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleKYCAction(exc.id, 'reject')}>
                        <XCircle size={14} className="mr-1" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Badge variant="default">Processed</Badge>
                  ),
                }))}
              />
            </CardContent>
          </Card>
        )}

        {activeTab === 'custody' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign size={20} />
                Custody Settlement Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { key: 'assetId', header: 'Asset ID' },
                  { key: 'amount', header: 'Amount ($)', align: 'right' },
                  { key: 'status', header: 'Status' },
                  { key: 'actions', header: 'Actions' },
                ]}
                data={custodyRequests.map(req => ({
                  ...req,
                  amount: `$${req.amount.toLocaleString()}`,
                  status: <Badge variant={req.status === 'approved' ? 'success' : req.status === 'rejected' ? 'danger' : 'warning'}>{req.status}</Badge>,
                  actions: req.status === 'pending' ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleCustodyAction(req.id, 'approve')}>
                        <CheckCircle size={14} className="mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleCustodyAction(req.id, 'reject')}>
                        <XCircle size={14} className="mr-1" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Badge variant="default">Processed</Badge>
                  ),
                }))}
              />
            </CardContent>
          </Card>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-6">
            {/* Export Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download size={20} />
                  Export Audit Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Format</label>
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value as 'csv' | 'pdf' | 'json')}
                      className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="csv">CSV</option>
                      <option value="json">JSON</option>
                      <option value="pdf">PDF (Coming Soon)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Start Date</label>
                    <Input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">End Date</label>
                    <Input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleExportAuditLogs} className="w-full">
                      <Download size={16} className="mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                    <Input
                      placeholder="Search audit logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audit Logs Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} />
                  Recent Audit Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={[
                    { key: 'timestamp', header: 'Timestamp' },
                    { key: 'action', header: 'Action' },
                    { key: 'user', header: 'User' },
                    { key: 'severity', header: 'Severity' },
                    { key: 'details', header: 'Details' },
                  ]}
                  data={auditLogs
                    .filter(log => {
                      if (searchTerm) {
                        return log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               log.user.toLowerCase().includes(searchTerm.toLowerCase());
                      }
                      if (dateRange.start && dateRange.end) {
                        const startDate = new Date(dateRange.start);
                        const endDate = new Date(dateRange.end);
                        return log.timestamp >= startDate && log.timestamp <= endDate;
                      }
                      return true;
                    })
                    .map(log => ({
                      ...log,
                      timestamp: log.timestamp.toLocaleString(),
                      severity: <Badge variant={getSeverityColor(log.severity)}>{log.severity}</Badge>,
                    }))}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle size={20} />
                  System Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-danger/10 border border-danger/20 rounded-lg">
                  <div>
                    <h4 className="font-medium text-danger">Emergency Pause</h4>
                    <p className="text-sm text-text-muted">Temporarily halt all system operations</p>
                  </div>
                  <Button variant="outline" onClick={() => setShowEmergencyModal(true)} className="border-danger text-danger hover:bg-danger hover:text-white">
                    Activate
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium text-text">System Status</h4>
                    <p className="text-sm text-text-muted">All systems operational</p>
                  </div>
                  <Badge variant="success">Online</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Oracle Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="New oracle value"
                    value={oracleUpdate}
                    onChange={(e) => setOracleUpdate(e.target.value)}
                  />
                  <Button onClick={handleOracleUpdate}>
                    Update Oracle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>

      {/* Emergency Modal */}
      <Modal isOpen={showEmergencyModal} onClose={() => setShowEmergencyModal(false)} title="Emergency Pause">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={24} className="text-danger mt-0.5" />
            <div>
              <h3 className="font-semibold text-danger mb-2">Emergency Pause Activation</h3>
              <p className="text-text-muted mb-4">
                This will immediately halt all deposit, withdrawal, and trading operations across the platform.
                Only use in case of critical security issues or system failures.
              </p>
              <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 mb-4">
                <p className="text-sm text-text-muted">
                  <strong>Impact:</strong> Users will be unable to interact with vaults until pause is lifted.
                  All pending transactions will be queued for processing after reactivation.
                </p>
              </div>
              <p className="text-sm text-text-muted">
                Type <strong>EMERGENCY</strong> to confirm:
              </p>
              <Input
                placeholder="Type EMERGENCY to confirm"
                className="mt-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setShowEmergencyModal(false)}>
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={handleEmergencyPause}
              className="border-danger text-danger hover:bg-danger hover:text-white"
            >
              Activate Emergency Pause
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}