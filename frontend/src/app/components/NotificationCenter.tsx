'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Trash2,
  Settings,
  Filter,
  Search,
  MoreVertical,
  DollarSign,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Badge from './Badge';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  category: 'transaction' | 'security' | 'system' | 'yield' | 'kyc';
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'transaction' | 'security' | 'system' | 'yield' | 'kyc'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Mock notifications data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Deposit Confirmed',
        message: 'Your $5,000 USDC deposit has been confirmed and shares have been minted.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        actionUrl: '/vault',
        actionText: 'View Vault',
        category: 'transaction'
      },
      {
        id: '2',
        type: 'info',
        title: 'Yield Distribution',
        message: 'Weekly yield of $125.50 has been distributed to your account.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        actionUrl: '/dashboard',
        actionText: 'View Earnings',
        category: 'yield'
      },
      {
        id: '3',
        type: 'warning',
        title: 'KYC Verification Required',
        message: 'Your KYC verification is expiring in 7 days. Please renew to maintain access.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        actionUrl: '/kyc',
        actionText: 'Renew KYC',
        category: 'kyc'
      },
      {
        id: '4',
        type: 'error',
        title: 'Withdrawal Failed',
        message: 'Your withdrawal request could not be processed due to insufficient liquidity.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true,
        category: 'transaction'
      },
      {
        id: '5',
        type: 'info',
        title: 'New Vault Available',
        message: 'A new high-yield real estate vault is now available for investment.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        read: true,
        actionUrl: '/dashboard',
        actionText: 'Explore Vaults',
        category: 'system'
      },
      {
        id: '6',
        type: 'warning',
        title: 'Security Alert',
        message: 'New device login detected. If this wasn\'t you, please secure your account.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
        read: true,
        actionUrl: '/settings',
        actionText: 'Review Security',
        category: 'security'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    let filtered = notifications;

    // Apply category filter
    if (filter === 'unread') {
      filtered = filtered.filter(n => !n.read);
    } else if (filter !== 'all') {
      filtered = filtered.filter(n => n.category === filter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [notifications, filter, searchTerm]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} className="text-success" />;
      case 'warning': return <AlertTriangle size={20} className="text-warning" />;
      case 'error': return <X size={20} className="text-danger" />;
      default: return <Info size={20} className="text-primary" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transaction': return <DollarSign size={16} />;
      case 'yield': return <TrendingUp size={16} />;
      case 'security': return <Shield size={16} />;
      case 'kyc': return <CheckCircle size={16} />;
      default: return <Info size={16} />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={24} className="text-text" />
            {unreadCount > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-danger rounded-full flex items-center justify-center text-xs text-white font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text">Notifications</h2>
            <p className="text-text-muted">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
          <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
            <Settings size={16} />
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
              <option value="transaction">Transactions</option>
              <option value="security">Security</option>
              <option value="system">System</option>
              <option value="yield">Yield</option>
              <option value="kyc">KYC</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">Email notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">Push notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">Transaction alerts</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">Security alerts</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Bell size={48} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text mb-2">No notifications found</h3>
              <p className="text-text-muted">
                {searchTerm || filter !== 'all' ? 'Try adjusting your filters' : 'You\'re all caught up!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <AnimatePresence>
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`transition-all duration-200 hover:shadow-md ${
                  !notification.read ? 'border-primary/30 bg-primary/5' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-medium ${!notification.read ? 'text-text' : 'text-text-muted'}`}>
                                {notification.title}
                              </h4>
                              <Badge variant="default" size="sm" className="flex items-center gap-1">
                                {getCategoryIcon(notification.category)}
                                {notification.category}
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                            <p className={`text-sm mb-2 ${!notification.read ? 'text-text' : 'text-text-muted'}`}>
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-text-muted">
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {notification.actionUrl && notification.actionText && (
                                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                  {notification.actionText}
                                </Button>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-text-muted hover:text-text"
                              >
                                Mark Read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-text-muted hover:text-danger"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Bulk Actions */}
      {filteredNotifications.length > 0 && (
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <p className="text-sm text-text-muted">
            {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
          </p>
          <Button variant="outline" onClick={clearAllNotifications} className="text-danger hover:bg-danger hover:text-white">
            <Trash2 size={16} className="mr-2" />
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}