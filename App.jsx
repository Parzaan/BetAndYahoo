import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { motion } from 'motion/react';
import { SidebarDemo } from './components/blocks/Sidebar';
import LandingPage from './pages/LandingPage';
import { MemeCard } from './components/ui/MemeCard';
import LeaderboardPage from './pages/Leaderboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setAuthView('login');
  };

  const handleUpdateUserData = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // If there's no user logged in, render the Auth view
  if (!user) {
    if (authView === 'login') {
      return (
        <LoginPage 
          onLoginSuccess={handleAuthSuccess} 
          onToggleSignUp={() => setAuthView('signup')} 
        />
      );
    }
    return (
      <SignUpPage 
        onSignUpSuccess={handleAuthSuccess} 
        onToggleLogin={() => setAuthView('login')} 
      />
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <LandingPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'profile':
        return <ProfilePage user={user} onUpdateUser={handleUpdateUserData} />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      <SidebarDemo 
        activePage={activePage} 
        setActivePage={setActivePage}
        onLogout={handleLogout}
        user={user}
      >
        {renderPage()}
      </SidebarDemo>
    </>
  );
}
