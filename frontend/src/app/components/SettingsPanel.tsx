'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Key,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  AlertTriangle
} from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import Badge from './Badge';
import toast from 'react-hot-toast';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  timezone: string;
  language: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  depositAlerts: boolean;
  withdrawalAlerts: boolean;
  yieldAlerts: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'contacts';
  showPortfolio: boolean;
  showActivity: boolean;
  dataExport: boolean;
  accountDeletion: boolean;
}

export default function SettingsPanel() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'security' | 'appearance'>('profile');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app, this would come from API
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Real estate investor and DeFi enthusiast',
    avatar: '',
    timezone: 'America/New_York',
    language: 'en'
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    depositAlerts: true,
    withdrawalAlerts: true,
    yieldAlerts: true,
    securityAlerts: true,
    marketingEmails: false
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'private',
    showPortfolio: false,
    showActivity: false,
    dataExport: false,
    accountDeletion: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Notification preferences updated!');
    } catch (error) {
      toast.error('Failed to update notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      // Mock data export
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data = {
        profile,
        notifications,
        privacy,
        walletAddress: address,
        exportDate: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `realyield-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Data exported successfully!');
    } catch (error) {
      toast.error('Failed to export data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      // Mock account deletion
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success('Account deletion initiated. You will receive a confirmation email.');
      setShowDeleteModal(false);
    } catch (error) {
      toast.error('Failed to initiate account deletion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-text-muted hover:bg-bg-muted hover:text-text'
                      }`}
                    >
                      <IconComponent size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User size={20} />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change Avatar</Button>
                      <p className="text-xs text-text-muted mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>

                  {/* Profile Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Full Name</label>
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Email Address</label>
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Timezone</label>
                      <select
                        value={profile.timezone}
                        onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                        className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Language</label>
                      <select
                        value={profile.language}
                        onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                        className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ja">日本語</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={isLoading}>
                      <Save size={16} className="mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell size={20} />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-text">Email Notifications</h4>
                        <p className="text-sm text-text-muted">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailNotifications}
                          onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-text">Push Notifications</h4>
                        <p className="text-sm text-text-muted">Receive push notifications in browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.pushNotifications}
                          onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <hr className="border-border" />

                    <div className="space-y-4">
                      <h4 className="font-medium text-text">Transaction Alerts</h4>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text">Deposit confirmations</span>
                        <input
                          type="checkbox"
                          checked={notifications.depositAlerts}
                          onChange={(e) => setNotifications({ ...notifications, depositAlerts: e.target.checked })}
                          className="w-4 h-4 text-primary bg-bg-card border-border rounded focus:ring-primary focus:ring-2"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text">Withdrawal requests</span>
                        <input
                          type="checkbox"
                          checked={notifications.withdrawalAlerts}
                          onChange={(e) => setNotifications({ ...notifications, withdrawalAlerts: e.target.checked })}
                          className="w-4 h-4 text-primary bg-bg-card border-border rounded focus:ring-primary focus:ring-2"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text">Yield distributions</span>
                        <input
                          type="checkbox"
                          checked={notifications.yieldAlerts}
                          onChange={(e) => setNotifications({ ...notifications, yieldAlerts: e.target.checked })}
                          className="w-4 h-4 text-primary bg-bg-card border-border rounded focus:ring-primary focus:ring-2"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text">Security alerts</span>
                        <input
                          type="checkbox"
                          checked={notifications.securityAlerts}
                          onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
                          className="w-4 h-4 text-primary bg-bg-card border-border rounded focus:ring-primary focus:ring-2"
                        />
                      </div>
                    </div>

                    <hr className="border-border" />

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-text">Marketing Emails</h4>
                        <p className="text-sm text-text-muted">Receive updates about new features and promotions</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.marketingEmails}
                        onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
                        className="w-4 h-4 text-primary bg-bg-card border-border rounded focus:ring-primary focus:ring-2"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveNotifications} disabled={isLoading}>
                      <Save size={16} className="mr-2" />
                      {isLoading ? 'Saving...' : 'Save Preferences'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield size={20} />
                      Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-text mb-3">Profile Visibility</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="visibility"
                            value="public"
                            checked={privacy.profileVisibility === 'public'}
                            onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value as any })}
                            className="w-4 h-4 text-primary bg-bg-card border-border focus:ring-primary focus:ring-2"
                          />
                          <span className="ml-2 text-sm text-text">Public - Anyone can see your profile</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="visibility"
                            value="contacts"
                            checked={privacy.profileVisibility === 'contacts'}
                            onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value as any })}
                            className="w-4 h-4 text-primary bg-bg-card border-border focus:ring-primary focus:ring-2"
                          />
                          <span className="ml-2 text-sm text-text">Contacts Only - Only approved connections</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="visibility"
                            value="private"
                            checked={privacy.profileVisibility === 'private'}
                            onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value as any })}
                            className="w-4 h-4 text-primary bg-bg-card border-border focus:ring-primary focus:ring-2"
                          />
                          <span className="ml-2 text-sm text-text">Private - Only you can see your profile</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-text">Show Portfolio Value</h4>
                          <p className="text-sm text-text-muted">Display your total portfolio value publicly</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacy.showPortfolio}
                          onChange={(e) => setPrivacy({ ...privacy, showPortfolio: e.target.checked })}
                          className="w-4 h-4 text-primary bg-bg-card border-border rounded focus:ring-primary focus:ring-2"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-text">Show Activity</h4>
                          <p className="text-sm text-text-muted">Display your transaction activity publicly</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacy.showActivity}
                          onChange={(e) => setPrivacy({ ...privacy, showActivity: e.target.checked })}
                          className="w-4 h-4 text-primary bg-bg-card border-border rounded focus:ring-primary focus:ring-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download size={20} />
                      Data Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-text">Export Your Data</h4>
                        <p className="text-sm text-text-muted">Download a copy of all your data</p>
                      </div>
                      <Button variant="outline" onClick={handleExportData} disabled={isLoading}>
                        <Download size={16} className="mr-2" />
                        {isLoading ? 'Exporting...' : 'Export Data'}
                      </Button>
                    </div>

                    <hr className="border-border" />

                    <div className="bg-danger/10 border border-danger/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle size={20} className="text-danger mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-danger mb-2">Delete Account</h4>
                          <p className="text-sm text-text-muted mb-4">
                            Permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                          <Button
                            variant="outline"
                            onClick={() => setShowDeleteModal(true)}
                            className="border-danger text-danger hover:bg-danger hover:text-white"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key size={20} />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone size={20} className="text-primary" />
                        <div>
                          <h4 className="font-medium text-text">Two-Factor Authentication</h4>
                          <p className="text-sm text-text-muted">Add an extra layer of security</p>
                        </div>
                      </div>
                      <Badge variant="warning">Not Enabled</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key size={20} className="text-primary" />
                        <div>
                          <h4 className="font-medium text-text">API Keys</h4>
                          <p className="text-sm text-text-muted">Manage your API access keys</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Eye size={20} className="text-primary" />
                        <div>
                          <h4 className="font-medium text-text">Login Sessions</h4>
                          <p className="text-sm text-text-muted">View and manage active sessions</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>

                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <h4 className="font-medium text-text mb-2">Security Recommendations</h4>
                    <ul className="text-sm text-text-muted space-y-1">
                      <li>• Enable two-factor authentication</li>
                      <li>• Use a hardware wallet for large transactions</li>
                      <li>• Regularly review your connected applications</li>
                      <li>• Keep your recovery phrases secure and offline</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'appearance' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette size={20} />
                    Appearance Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text mb-3">Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="p-4 border border-border rounded-lg text-center hover:border-primary transition-colors">
                        <div className="w-full h-16 bg-white border rounded mb-2"></div>
                        <span className="text-sm text-text">Light</span>
                      </button>
                      <button className="p-4 border border-primary rounded-lg text-center bg-primary/5">
                        <div className="w-full h-16 bg-bg-dark border border-border rounded mb-2"></div>
                        <span className="text-sm text-text">Dark</span>
                      </button>
                      <button className="p-4 border border-border rounded-lg text-center hover:border-primary transition-colors">
                        <div className="w-full h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded mb-2"></div>
                        <span className="text-sm text-text">Auto</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-3">Language</label>
                    <select className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-3">Currency Display</label>
                    <select className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text">Reduced Motion</h4>
                      <p className="text-sm text-text-muted">Minimize animations and transitions</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary bg-bg-card border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Account">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={24} className="text-danger mt-0.5" />
            <div>
              <h3 className="font-semibold text-text mb-2">Are you absolutely sure?</h3>
              <p className="text-text-muted text-sm mb-4">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </p>
              <ul className="text-sm text-text-muted space-y-1 mb-4">
                <li>• All your vaults and positions will be closed</li>
                <li>• Your transaction history will be deleted</li>
                <li>• Your KYC verification will be revoked</li>
                <li>• You will lose access to all associated wallets</li>
              </ul>
              <p className="text-sm text-text-muted">
                Please type <strong>DELETE</strong> to confirm:
              </p>
              <Input
                placeholder="Type DELETE to confirm"
                className="mt-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={handleDeleteAccount}
              disabled={isLoading}
              className="border-danger text-danger hover:bg-danger hover:text-white"
            >
              {isLoading ? 'Deleting...' : 'Delete Account'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}