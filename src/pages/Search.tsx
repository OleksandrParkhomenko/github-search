// src/pages/Search.tsx
import React from 'react';
import SearchContainer from '../containers/SearchContainer/SearchContainer';
import Typography from '@mui/material/Typography';
import styles from '../styles/common.module.css';

const Search: React.FC = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h1" gutterBottom>
        Search
      </Typography>
      <SearchContainer />
    </div>
  );
};

export default Search;
