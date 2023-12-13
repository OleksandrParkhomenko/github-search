// src/context/AppContextProvider.tsx
import React, { ReactNode } from 'react';
import { FavoritesProvider } from './FavoritesContext';
import { ApolloProvider } from '@apollo/client';
import client from '../services/githubApollo';

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <FavoritesProvider>{children}</FavoritesProvider>
    </ApolloProvider>
  );
};

export default AppContextProvider;
