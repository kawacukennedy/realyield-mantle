'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, TrendingUp, DollarSign, Clock, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import TransactionHistory from './TransactionHistory';
import Skeleton from './Skeleton';
import Button from './Button';

interface PortfolioData {
  tvl: number;
  totalYieldEarned: number;
  pendingWithdrawals: number;
}

interface Vault {
  id: string;
  name: string;
  tvl: number;
  apy: number;
  risk_score: number;
  jurisdiction: string;
  asset_type: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface ChartData {
  timestamp: string;
  vault: string;
  apy: number;
  fiatValue: number;
}

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<PortfolioData>({ tvl: 0, totalYieldEarned: 0, pendingWithdrawals: 0 });
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [filteredVaults, setFilteredVaults] = useState<Vault[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [filters, setFilters] = useState({ apy: '', risk: '', assetType: '', jurisdiction: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isConnected) return;

    // Fetch from backend
    const fetchData = async () => {
      try {
        const vaultsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/vaults`);
        const vaultsData = await vaultsRes.json();
        setVaults(vaultsData.vaults);

        // Mock other data for now
        setPortfolio({ tvl: 100000, totalYieldEarned: 5000, pendingWithdrawals: 2000 });
        setActivities([
          { id: '1', type: 'deposit', description: 'Deposited 1000 USDC', timestamp: '2023-10-01' },
          { id: '2', type: 'yield', description: 'Yield claimed: 50 USDC', timestamp: '2023-10-02' },
        ]);
        setChartData([
          { timestamp: '2023-09-01', vault: 'Real Estate', apy: 8.5, fiatValue: 1000 },
          { timestamp: '2023-09-02', vault: 'Real Estate', apy: 8.5, fiatValue: 1050 },
        ]);

        // Mock vaults with more data
        const mockVaults = [
          { id: '1', name: 'Real Estate Vault', tvl: 50000, apy: 8.5, risk_score: 3, jurisdiction: 'US', asset_type: 'Real Estate' },
          { id: '2', name: 'Bond Vault', tvl: 30000, apy: 5.2, risk_score: 2, jurisdiction: 'EU', asset_type: 'Bonds' },
        ];
        setVaults(mockVaults);
        setFilteredVaults(mockVaults);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      if (isConnected) {
        fetchData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isConnected]);

  useEffect(() => {
    const filtered = vaults.filter(vault => {
      const matchesFilters =
        (filters.apy === '' || vault.apy >= parseFloat(filters.apy)) &&
        (filters.risk === '' || vault.risk_score <= parseInt(filters.risk)) &&
        (filters.assetType === '' || vault.asset_type === filters.assetType) &&
        (filters.jurisdiction === '' || vault.jurisdiction === filters.jurisdiction);
      const matchesSearch = searchTerm === '' || vault.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilters && matchesSearch;
    });
    setFilteredVaults(filtered);
  }, [vaults, filters, searchTerm]);

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <p className="text-muted mb-4">Wallet not connected</p>
        <button className="px-4 py-2 bg-primary text-white rounded">Connect Wallet</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </div>
        <div className="space-y-4">
          <Skeleton height="300px" />
        </div>
        <div className="space-y-4">
          <Skeleton height="200px" />
          <Skeleton height="200px" />
        </div>
      </div>
    );
  }

  if (vaults.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl mb-4">No vaults yet</h2>
        <p className="text-muted mb-4">Create or join a vault to get started</p>
        <button className="px-4 py-2 bg-primary text-white rounded">Create Vault</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} />
                Portfolio Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign size={24} className="text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-text">${portfolio.tvl.toLocaleString()}</p>
                  <p className="text-sm text-text-muted">Total Value Locked</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp size={24} className="text-success" />
                  </div>
                  <p className="text-2xl font-bold text-text">${portfolio.totalYieldEarned.toLocaleString()}</p>
                  <p className="text-sm text-text-muted">Yield Earned</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock size={24} className="text-warning" />
                  </div>
                  <p className="text-2xl font-bold text-text">${portfolio.pendingWithdrawals.toLocaleString()}</p>
                  <p className="text-sm text-text-muted">Pending Withdrawals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">Deposit Funds</Button>
            <Button variant="secondary" className="w-full">Withdraw Funds</Button>
            <Button variant="outline" className="w-full">Create Asset</Button>
          </CardContent>
        </Card>
      </div>

      {/* Primary Content */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Vaults</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-48">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search vaults..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <select
                value={filters.apy}
                onChange={(e) => setFilters({ ...filters, apy: e.target.value })}
                className="px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              >
                <option value="">APY: Any</option>
                <option value="5">5%+</option>
                <option value="7">7%+</option>
                <option value="10">10%+</option>
              </select>
              <select
                value={filters.risk}
                onChange={(e) => setFilters({ ...filters, risk: e.target.value })}
                className="px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              >
                <option value="">Risk: Any</option>
                <option value="2">Low (≤2)</option>
                <option value="3">Medium (≤3)</option>
                <option value="5">High (≤5)</option>
              </select>
              <select
                value={filters.assetType}
                onChange={(e) => setFilters({ ...filters, assetType: e.target.value })}
                className="px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              >
                <option value="">Asset Type: Any</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Bonds">Bonds</option>
                <option value="Invoices">Invoices</option>
              </select>
              <select
                value={filters.jurisdiction}
                onChange={(e) => setFilters({ ...filters, jurisdiction: e.target.value })}
                className="px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              >
                <option value="">Jurisdiction: Any</option>
                <option value="US">US</option>
                <option value="EU">EU</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredVaults.map(vault => (
                <Card key={vault.id} className="hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-text">{vault.name}</h4>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {vault.apy}% APY
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-muted">TVL</span>
                        <span className="text-text">${vault.tvl.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Risk</span>
                        <span className={`font-medium ${
                          vault.risk_score <= 2 ? 'text-success' :
                          vault.risk_score <= 3 ? 'text-warning' : 'text-danger'
                        }`}>
                          {vault.risk_score <= 2 ? 'Low' : vault.risk_score <= 3 ? 'Medium' : 'High'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Type</span>
                        <span className="text-text">{vault.asset_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Jurisdiction</span>
                        <span className="text-text">{vault.jurisdiction}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
         </Card>
        <Card>
          <CardHeader>
            <CardTitle>Yield History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="fiatValue" stroke="#00FFB2" fill="#00FFB2" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Actions/Notifications */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={20} />
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-bg-muted rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'deposit' ? 'bg-success/10 text-success' :
                      activity.type === 'yield' ? 'bg-primary/10 text-primary' :
                      'bg-text-muted/10 text-text-muted'
                    }`}>
                      {activity.type === 'deposit' ? <DollarSign size={16} /> :
                       activity.type === 'yield' ? <TrendingUp size={16} /> :
                       <Activity size={16} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-text font-medium">{activity.description}</p>
                      <p className="text-sm text-text-muted">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionHistory />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}