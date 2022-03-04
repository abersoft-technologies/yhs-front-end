import Head from 'next/head';
import React from 'react';
import styles from '../../styles/Layout.module.scss';

/* Components for layout */
import Sidebar from '../components/sidebar/Sidebar';

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Head>
        <title>YH-sökaren</title>
        <meta
          name='description'
          content='YH-ansökan - Sök din utbildning genom oss'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </>
  );
}
