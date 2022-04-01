import React from 'react';
import { useRouter } from 'next/router';

import styles from './Topbar.module.scss';

/* Components imports */
import { Flex } from '../ui/Flex';
import SearchBar from './searchbar/SearchBar';
import UserMenu from './usermenu/UserMenu';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { IUserModel } from '../../types/global';

const Topbar = () => {
  const router = useRouter();
  const user = useLocalStorage('get', 'session', 'user');
  const parsedUser: IUserModel = user;
  const setPageTitle = () => {
    if (router.pathname === '/') return 'Överblick';
    if (router.pathname === '/analys') return 'Analys';
    if (router.pathname === '/kontakter') return 'Kontakter';
  };
  console.log('parsedUser', parsedUser);
  return (
    <section className={styles.topbar}>
      <Flex direction='row' gap='large' align='center'>
        <button>
          <img src='/close-hamburger.svg' alt='Hamburger menu' />
        </button>
        <h2>{setPageTitle()}</h2>
      </Flex>
      <Flex direction='row' align='center' justify='flex-end' gap='xxx-large'>
        <SearchBar />
        <UserMenu
          firstName={parsedUser ? parsedUser.firstName : 'JesperKing'}
        />
      </Flex>
    </section>
  );
};

export default Topbar;
