import React from 'react';

import styles from './Topbar.module.scss';

/* Components imports */
import SearchBar from './searchbar/SearchBar';
import UserMenu from './usermenu/UserMenu';

const Topbar = () => {
  return (
    <section className={styles.topbar}>
      <SearchBar />
      <UserMenu />
    </section>
  );
};

export default Topbar;
