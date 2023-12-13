// src/components/SearchBar/SearchBar.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../styles/SearchBar.module.css';

interface SearchBarProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, loading, onChange }) => {
  const helperText = value.length >= 3 ? ' ' : 'Enter at least 3 characters';

  return (
    <div className={styles.container}>
      <TextField
        placeholder="Enter GitHub repository name"
        variant="outlined"
        color="primary"
        fullWidth
        className={styles.input}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        InputProps={{
          endAdornment: loading && <CircularProgress size={24} />,
        }}
        helperText={helperText}
      />
    </div>
  );
};

export default SearchBar;
