// src/components/NavigationBar/NavigationBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

const NavigationBar: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Github Search
        </Typography>
        <Button color="inherit" component={Link} to="/" startIcon={<SearchIcon />} style={{ marginLeft: 'auto' }}>
          Search
        </Button>
        <Button color="inherit" component={Link} to="/favorites" startIcon={<FavoriteIcon />}>
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
