import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DemoContextType {
  isDemoMode: boolean;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
  toggleDemoMode: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

interface DemoProviderProps {
  children: ReactNode;
}

export const DemoProvider: React.FC<DemoProviderProps> = ({ children }) => {
  // Check if we're in GitHub Pages or explicitly in demo mode via env variable
  const isGitHubPages = window.location.hostname.includes('github.io');
  const envDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

  const [isDemoMode, setIsDemoMode] = useState<boolean>(
    isGitHubPages || envDemoMode
  );

  const enableDemoMode = () => {
    setIsDemoMode(true);
    localStorage.setItem('noteforge_demo_mode', 'true');
  };

  const disableDemoMode = () => {
    setIsDemoMode(false);
    localStorage.setItem('noteforge_demo_mode', 'false');
  };

  const toggleDemoMode = () => {
    setIsDemoMode(prev => {
      const newMode = !prev;
      localStorage.setItem('noteforge_demo_mode', String(newMode));
      return newMode;
    });
  };

  const value = {
    isDemoMode,
    enableDemoMode,
    disableDemoMode,
    toggleDemoMode
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};

export const useDemoMode = (): DemoContextType => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemoMode must be used within a DemoProvider');
  }
  return context;
};
