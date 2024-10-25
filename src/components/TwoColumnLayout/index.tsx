import React from 'react';
import styles from './two-column-layout.module.css';

export default function TwoColumnLayout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
