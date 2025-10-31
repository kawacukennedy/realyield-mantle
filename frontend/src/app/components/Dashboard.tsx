'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import TransactionHistory from './TransactionHistory';
import Skeleton from './Skeleton';

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
        <div className="bg-panel p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Portfolio Summary</h3>
          <p>TVL: ${portfolio.tvl.toLocaleString()}</p>
          <p>Total Yield Earned: ${portfolio.totalYieldEarned.toLocaleString()}</p>
          <p>Pending Withdrawals: ${portfolio.pendingWithdrawals.toLocaleString()}</p>
        </div>
        <div className="bg-panel p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <button className="w-full mb-2 px-4 py-2 bg-primary text-white rounded">Deposit</button>
          <button className="w-full mb-2 px-4 py-2 bg-secondary text-white rounded">Withdraw</button>
          <button className="w-full px-4 py-2 bg-ghost text-white rounded">Mint Asset</button>
        </div>
      </div>

      {/* Primary Content */}
      <div className="space-y-4">
        <div className="bg-panel p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Vaults</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Search vaults..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 bg-bg-dark border rounded flex-1 min-w-48"
            />
            <select
              value={filters.apy}
              onChange={(e) => setFilters({ ...filters, apy: e.target.value })}
              className="p-2 bg-bg-dark border rounded"
            >
              <option value="">APY: Any</option>
              <option value="5">5%+</option>
              <option value="7">7%+</option>
              <option value="10">10%+</option>
            </select>
            <select
              value={filters.risk}
              onChange={(e) => setFilters({ ...filters, risk: e.target.value })}
              className="p-2 bg-bg-dark border rounded"
            >
              <option value="">Risk: Any</option>
              <option value="2">Low (≤2)</option>
              <option value="3">Medium (≤3)</option>
              <option value="5">High (≤5)</option>
            </select>
            <select
              value={filters.assetType}
              onChange={(e) => setFilters({ ...filters, assetType: e.target.value })}
              className="p-2 bg-bg-dark border rounded"
            >
              <option value="">Asset Type: Any</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Bonds">Bonds</option>
              <option value="Invoices">Invoices</option>
            </select>
            <select
              value={filters.jurisdiction}
              onChange={(e) => setFilters({ ...filters, jurisdiction: e.target.value })}
              className="p-2 bg-bg-dark border rounded"
            >
              <option value="">Jurisdiction: Any</option>
              <option value="US">US</option>
              <option value="EU">EU</option>
            </select>
          </div>
          <div className="space-y-2">
            {filteredVaults.map(vault => (
              <div key={vault.id} className="p-2 border rounded cardLift">
                <p>{vault.name}</p>
                <p>TVL: ${vault.tvl.toLocaleString()} | APY: {vault.apy}% | Risk: {vault.risk_score} | {vault.jurisdiction}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-panel p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Yield History</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="fiatValue" stroke="#00FFB2" fill="#00FFB2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Actions/Notifications */}
      <div className="space-y-4">
        <div className="bg-panel p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
          <div className="space-y-2">
            {activities.map(activity => (
              <div key={activity.id} className="p-2 border rounded">
                <p>{activity.description}</p>
                <p className="text-sm text-muted">{activity.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-panel p-4 rounded-lg">
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}