// src/context/AppContextProvider.tsx
import React, { ReactNode } from 'react';
import { FavoritesProvider } from './FavoritesContext';

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  return (
    <FavoritesProvider>{children}</FavoritesProvider>
  );
};

export default AppContextProvider;
