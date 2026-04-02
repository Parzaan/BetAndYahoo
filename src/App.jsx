import React, { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { motion } from 'motion/react';
import { SidebarDemo } from './components/blocks/Sidebar';
import LandingPage from './pages/LandingPage';
import { MemeCard } from './components/ui/MemeCard';
import LeaderboardPage from './pages/Leaderboard';
import Profile from './pages/Profile';

export default function App(){
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <LandingPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'profile':
        return <Profile />;
      default:
        return <LandingPage />;
    }
  };

  return(
    <>
      <SidebarDemo activePage={activePage} setActivePage={setActivePage}>
        {renderPage()}
      </SidebarDemo>
    </>
  )
}
