import React from 'react';
import { Redirect } from '../../../globalFunctions/redirect';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { RootState } from '../../../store/store';
import { Flex } from '../../ui/Flex';

import styles from './Usermenu.module.scss';
import { useAppSelector } from '../../../hooks/useStore';
import { DropdownMenu } from '../../ui/dropdown/DropdownMenu';

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
interface DropdownMenuItem {
  text: string;
  img?: { url: string; alt: string };
  onClick: (() => void) | string;
  id: string;
  type?: 'normal' | 'warning';
}

const UserMenu = (props: IUserMenu) => {
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

  const user: UserObject = useAppSelector(
    (state: RootState) => state.userReducer
  );

  const logout = () => {
    useLocalStorage('remove', 'session', 'user');
    sessionStorage.clear();
    localStorage.clear();
    Redirect('/inloggning');
  };

  const dropdownListItems: DropdownMenuItem[] = [
    {
      text: 'Dina mål',
      onClick: '/dinamal',
      id: 'dina-mal',
      img: { url: '/svgs/top_bar/badge.svg', alt: 'Badge' },
    },
    {
      text: 'Inställningar',
      onClick: '/',
      id: 'settings',
      img: { url: '/svgs/top_bar/settings.svg', alt: 'Settings' },
    },
    {
      text: 'Logga ut',
      onClick: logout,
      id: 'logout',
      img: { url: '/svgs/top_bar/signout.svg', alt: 'Turn off' },
      type: 'warning',
    },
  ];

  return (
    <div className={styles.usermenu_container}>
      <Flex direction='row'>
        <img src='/placeholder-avatar.svg' alt='Profile Picutre' />
        <button
          id='drop-down-profile-menu'
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <span>{user ? user.data.user.firstName : 'Inget'}</span>
          <span>{user ? user.data.user.lastName : 'Namn'}</span>
          <img src='/svgs/top_bar/chevron-down.svg' alt='Chevron down' />
        </button>
      </Flex>
      <DropdownMenu
        listItems={dropdownListItems}
        id='drop-down-profile-menu'
        width='medium'
        open={openDropdown}
        setOpen={setOpenDropdown}
      />
    </div>
  );
};

export default UserMenu;
