import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { IconUserCircle, IconWallet, IconRefresh } from '@tabler/icons-react';

export default function ProfilePage({ user, onUpdateUser }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLatestData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${user.id}`);
      if (!response.ok) throw new Error('Failed to fetch latest data');
      
      const data = await response.json();
      if (onUpdateUser) {
        onUpdateUser(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col h-full bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700 p-8 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">Profile</h1>
          <button 
            onClick={fetchLatestData}
            disabled={loading}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500 disabled:opacity-50"
            title="Refresh Data"
          >
            <IconRefresh className={`h-6 w-6 ${loading ? 'animate-spin cursor-not-allowed' : ''}`} />
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-50 dark:bg-neutral-800/50 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700/50 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-1 flex-shrink-0 shadow-xl">
              <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
                <IconUserCircle className="w-20 h-20 text-neutral-400" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-4 pt-4">
              <div>
                <h2 className="text-3xl font-bold text-neutral-800 dark:text-white">
                  @{user?.username || 'Guest'}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400">Bet NYahoo Trader</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* Balance Badge */}
                <div className="flex items-center gap-3 bg-white dark:bg-neutral-900 px-6 py-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
                  <div className="p-2 bg-green-500/10 rounded-xl">
                    <IconWallet className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-none">Available Balance</p>
                    <p className="text-2xl font-bold text-neutral-800 dark:text-white mt-1">
                      ${user?.balance?.toLocaleString() || '1,000'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700/50">
            <h3 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-4">Trading Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">Total Bets Placed</span>
                <span className="font-medium dark:text-neutral-200">0</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">Win Rate</span>
                <span className="font-medium dark:text-neutral-200">0%</span>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
