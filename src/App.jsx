import React from 'react';
import Icon from '@/components/ui/Icon';
import { motion } from 'motion/react';
import { SidebarDemo } from './components/blocks/Sidebar';
import LandingPage from './pages/LandingPage';

export default function App(){
  return(
    <>
      <SidebarDemo>
        <LandingPage />
      </SidebarDemo>
    </>
  )
}
