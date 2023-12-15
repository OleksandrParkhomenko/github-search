// src/context/AppContextProvider.tsx
import React, { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ApolloProvider } from '@apollo/client';

import { FavoritesProvider } from 'context/FavoritesContext';
import client from 'services/githubApollo';
import theme from 'theme';

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default AppContextProvider;
