import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import styles from '../../styles/Layout.module.scss';

/* Components for layout */
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';

interface ILayoutProps {
  children: React.ReactNode;
  doNotShowSidebar?: boolean;
}

export default function Layout({ children }: ILayoutProps) {
  const router = useRouter();

  const checkIfLoginOrRegister =
    router.pathname.includes('/inloggning') ||
    router.pathname.includes('/registrering')
      ? true
      : false;

  const sidebar = checkIfLoginOrRegister ? (
    <></>
  ) : (
    <>
      <Sidebar />
      <Topbar />
    </>
  );

  return (
    <>
      <Head>
        <title>YH Portalen</title>
        <meta
          name='description'
          content='YH Portalen - Sök din utbildning genom oss'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {sidebar}
      <main
        className={
          checkIfLoginOrRegister ? styles.main_login_register : styles.main
        }
      >
        {children}
      </main>
    </>
  );
}
