import Link from 'next/link';
import React from 'react';
import { Redirect } from '../../../globalFunctions/redirect';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { IUserModel } from '../../../types/global';
import { Flex } from '../../ui/Flex';

import styles from './Usermenu.module.scss';

interface IUserMenu {
  firstName?: string;
}

const UserMenu = (props: IUserMenu) => {
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

  const logout = () => {
    useLocalStorage('remove', 'session', 'user');
    Redirect('/inloggning');
  };

  return (
    <div className={styles.usermenu_container}>
      <Flex direction='row'>
        <img src='/placeholder-avatar.svg' alt='Profile Picutre' />
        <button onClick={() => setOpenDropdown(!openDropdown)}>
          {props.firstName}
          <img src='/chevron-down.svg' alt='Chevron down' />
        </button>
      </Flex>
      {openDropdown ? (
        <div className={styles.usermenu_dropdown}>
          <button onClick={logout}>Logga ut</button>
        </div>
      ) : null}
    </div>
  );
};

export default UserMenu;
