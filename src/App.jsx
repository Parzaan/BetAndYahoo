import React from 'react';
import Icon from '@/components/ui/Icon';
import { motion } from 'motion/react';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl space-y-6"
      >
        <div className="flex justify-center">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icon name="Rocket" className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold tracking-tight">
          Environment Initialized
        </h1>
        
        <p className="text-xl text-muted-foreground">
          React + Vite + Tailwind v4 + shadcn/ui + Motion library.
          <br />
          Your project structure is ready for building.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-4 border rounded-xl bg-card shadow-sm">
            <h3 className="font-semibold flex items-center gap-2 justify-center">
              <Icon name="LayoutGrid" className="w-4 h-4" /> Structure
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Ready in src/components/blocks & ui
            </p>
          </div>
          <div className="p-4 border rounded-xl bg-card shadow-sm">
            <h3 className="font-semibold flex items-center gap-2 justify-center">
              <Icon name="Zap" className="w-4 h-4" /> Tailwind v4
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              CSS-native config in src/index.css
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
