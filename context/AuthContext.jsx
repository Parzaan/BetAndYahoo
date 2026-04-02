import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'mememarket_user';
const STARTING_BALANCE = 10000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const saveUser = (userData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const signup = (username, password) => {
    const users = JSON.parse(localStorage.getItem('mememarket_users') || '{}');
    if (users[username]) {
      throw new Error('Username already taken!');
    }
    users[username] = { password, createdAt: Date.now() };
    localStorage.setItem('mememarket_users', JSON.stringify(users));
    
    const userData = {
      username,
      balance: STARTING_BALANCE,
      bets: [],
      betHistory: [],
      wins: 0,
      losses: 0,
      totalProfit: 0,
      achievements: [],
      createdAt: Date.now(),
    };
    saveUser(userData);
    return userData;
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('mememarket_users') || '{}');
    if (!users[username] || users[username].password !== password) {
      throw new Error('Invalid username or password!');
    }
    
    const stored = localStorage.getItem(`mememarket_profile_${username}`);
    if (stored) {
      const userData = JSON.parse(stored);
      saveUser(userData);
      return userData;
    }

    const userData = {
      username,
      balance: STARTING_BALANCE,
      bets: [],
      betHistory: [],
      wins: 0,
      losses: 0,
      totalProfit: 0,
      achievements: [],
      createdAt: Date.now(),
    };
    saveUser(userData);
    return userData;
  };

  const logout = () => {
    if (user) {
      localStorage.setItem(`mememarket_profile_${user.username}`, JSON.stringify(user));
    }
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const updateBalance = (amount) => {
    setUser(prev => {
      const updated = { ...prev, balance: prev.balance + amount };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      if (updated.username) {
        localStorage.setItem(`mememarket_profile_${updated.username}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const placeBet = (memeId, memeTitle, side, amount, odds) => {
    if (amount > user.balance) throw new Error('Insufficient balance!');
    if (amount <= 0) throw new Error('Invalid bet amount!');

    const bet = {
      id: `bet-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      memeId,
      memeTitle,
      side,
      amount,
      odds,
      potentialPayout: parseFloat((amount / odds).toFixed(2)),
      timestamp: Date.now(),
      status: 'active',
    };

    setUser(prev => {
      const updated = {
        ...prev,
        balance: prev.balance - amount,
        bets: [...prev.bets, bet],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      if (updated.username) {
        localStorage.setItem(`mememarket_profile_${updated.username}`, JSON.stringify(updated));
      }
      return updated;
    });

    return bet;
  };

  return (
    <AuthContext.Provider value={{
      user, loading, signup, login, logout,
      updateBalance, placeBet, isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
