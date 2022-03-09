import React from 'react';

import styles from './Usermenu.module.scss';

const UserMenu = () => {
  return (
    <div className={styles.usermenu_container}>
      <img src='/placeholder-avatar.svg' alt='Profile Picutre' />
      <button>
        {'Lorem name'}
        <img src='/chevron-down.svg' alt='Chevron down' />
      </button>
    </div>
  );
};

export default UserMenu;
