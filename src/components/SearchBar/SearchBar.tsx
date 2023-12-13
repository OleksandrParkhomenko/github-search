// src/components/SearchBar/SearchBar.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../../styles/SearchBar.module.css';
import CircularProgress from '@mui/material/CircularProgress';

interface SearchBarProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, loading, onChange, onSearch }) => {
  return (
    <div className={styles.container}>
      <TextField
        placeholder="Enter GitHub repository name"
        variant="outlined"
        color="primary"
        fullWidth
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={onSearch} className={styles.button}>
        {!loading && <>Search</>}
        {loading && <CircularProgress size={24} />}
      </Button>
    </div>
  );
};

export default SearchBar;
