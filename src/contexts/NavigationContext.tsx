"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationContextType {
  activeItem: string;
  setActiveItem: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(pathname);

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}