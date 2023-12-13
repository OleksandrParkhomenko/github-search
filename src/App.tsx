// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Search from './pages/Search';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

import NavigationBar from './components/NavigationBar/NavigationBar';

import AppContextProvider from './context/AppContextProvider';

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

loadDevMessages();
loadErrorMessages();

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <Router>
        <div>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AppContextProvider>
  );
};

export default App;
