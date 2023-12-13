// src/pages/NotFound.tsx
import React from 'react';
import styles from '../styles/common.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
