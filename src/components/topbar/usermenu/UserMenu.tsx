import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from '../../../globalFunctions/redirect';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { RootState } from '../../../store/store';
import { IUserModelRedux } from '../../../types/global';
import { Flex } from '../../ui/Flex';
import SelectCurrentUser from '../../../store/slice/userSlice';

import styles from './Usermenu.module.scss';
import { useAppSelector } from '../../../hooks/useStore';

interface IUserMenu {
  firstName?: string;
}

interface UserObject {
  status: null;
  data: {
    token: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      date: string;
      id: string;
    };
  };
  message: string;
}

const UserMenu = (props: IUserMenu) => {
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

  const user: UserObject = useAppSelector(
    (state: RootState) => state.userReducer
  );
  useEffect(() => {
    const onClick = (event: any) => {
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
    console.log('USER --->', user);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [user]);

  const logout = () => {
    useLocalStorage('remove', 'session', 'user');
    sessionStorage.clear();
    localStorage.clear();
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
          <span>{user ? user.data.user.firstName : 'Inget'}</span>
          <span>{user ? user.data.user.lastName : 'Namn'}</span>
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
