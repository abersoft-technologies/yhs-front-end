import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from '../../../globalFunctions/redirect';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { RootState } from '../../../store/store';
import { IUserModel } from '../../../types/global';
import { Flex } from '../../ui/Flex';

import styles from './Usermenu.module.scss';

interface IUserMenu {
  firstName?: string;
}

const UserMenu = (props: IUserMenu) => {
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

  const user = useSelector(
    (state: RootState) => state.userReducer.user && state.userReducer.user.data.user
  );
  useEffect(() => {
    const onClick = (event: any) => {
      console.log(event.target.closest('button'));
      if (
        event.target.closest('button') &&
        event.target.closest('button').id === 'dropdown-usermenu'
      ) {
        return;
      } else {
        setOpenDropdown(false);
      }
    };

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);

  const logout = () => {
    useLocalStorage('remove', 'session', 'user');
    Redirect('/inloggning');
  };

  return (
    <div className={styles.usermenu_container}>
      <Flex direction='row'>
        <img src='/placeholder-avatar.svg' alt='Profile Picutre' />
        <button
          id='dropdown-usermenu'
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <span>{user && user.firstName}</span>
          <span>{user && user.lastName}</span>
          <img src='/chevron-down.svg' alt='Chevron down' />
        </button>
      </Flex>
      {openDropdown ? (
        <div className={styles.usermenu_dropdown}>
          <button>Dina mål</button>
          <button>Inställningar</button>
          <button onClick={logout}>Logga ut</button>
        </div>
      ) : null}
    </div>
  );
};

export default UserMenu;
