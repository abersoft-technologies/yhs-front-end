import React from 'react';

import styles from './Searchbar.module.scss';

const SearchBar = () => {
  return (
    <div className={styles.searchbar_container}>
      <img src='/magnifying-glass.svg' alt='Magnifying glass' />
      <input type='search' placeholder='Testa att söka!' />
    </div>
  );
};

export default SearchBar;
