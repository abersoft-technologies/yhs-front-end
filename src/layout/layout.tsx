import React from 'react';
import Head from 'next/head';

import styles from '../../styles/Layout.module.scss';

/* Components for layout */
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';

interface ILayoutProps {
  children: React.ReactNode;
  doNotShowSidebar?: boolean;
}

export default function Layout({ children }: ILayoutProps) {
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
      <Sidebar />
      <Topbar />
      <main className={styles.main}>{children}</main>
    </>
  );
}
