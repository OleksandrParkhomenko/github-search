// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#FF4081',
    },
    background: {
      default: '#F5F5F5',
    },
    text: {
      primary: '#333',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#333',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#333',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#333',
    },
    h4: {
      fontSize: '1.2rem',
      fontWeight: 500,
      color: '#333',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#333',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: '#757575',
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export default theme;
