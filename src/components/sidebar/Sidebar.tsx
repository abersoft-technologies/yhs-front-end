import React from 'react';
import Link from 'next/link';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <img src='/logo.svg' />
      <ul>
        <li>
          <img src='/grid-icon.svg' />
          <Link href={'/'}>Överblick</Link>
        </li>
        <li>
          <img src='/analys-icon.svg' />
          <Link href={'/'}>Analys</Link>
        </li>
        <li>
          <img src='/contact-icon.svg' />
          <Link href={'/'}>Kontakter</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
