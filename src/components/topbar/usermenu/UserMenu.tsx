import React from 'react';
import { IUserModel } from '../../../types/global';

import styles from './Usermenu.module.scss';

const UserMenu = () => {
  const name = localStorage.getItem("user");
  let parsedName: IUserModel = {
    name: "",
    username: "",
    email: "",
    password: "",
    date: ""
  };
  if(name) {
    parsedName = JSON.parse(name)
  }
  return (
    <div className={styles.usermenu_container}>
      <img src='/placeholder-avatar.svg' alt='Profile Picutre' />
      <button>
        {parsedName.name}
        <img src='/chevron-down.svg' alt='Chevron down' />
      </button>
    </div>
  );
};

export default UserMenu;
