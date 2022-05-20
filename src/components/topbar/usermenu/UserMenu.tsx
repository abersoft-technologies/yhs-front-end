import React from 'react';
import { Redirect } from '../../../globalFunctions/redirect';
import { RootState } from '../../../store/store';
import { useAppSelector } from '../../../hooks/useStore';

/* Styles imports  */
import styles from './Usermenu.module.scss';

/* Components imports */
import { DropdownMenu } from '../../ui/dropdown/DropdownMenu';
import { Flex } from '../../ui/Flex';

interface DropdownMenuItem {
  text: string;
  img?: { url: string; alt: string };
  onClick: (() => void) | string;
  id: string;
  type?: 'normal' | 'warning';
}

const UserMenu = () => {
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

  const user = useAppSelector((state: RootState) => state.userReducer.user);

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    Redirect('/inloggning');
  };

  const dropdownListItems: DropdownMenuItem[] = [
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
          <span>{user ? user.firstName : 'Inget'}</span>
          <span>{user ? user.lastName : 'Namn'}</span>
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
