import Head from 'next/head';
import React from 'react';
import styles from '../../styles/Layout.module.scss';

/* Components for layout */
import Sidebar from '../components/sidebar/Sidebar';

interface ILayoutProps {
  children: React.ReactNode;
  doNotShowSidebar?: boolean;
}

export default function Layout({ children, doNotShowSidebar }: ILayoutProps) {

  const sidebar = doNotShowSidebar ? <></> : <Sidebar />;

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
      {sidebar}
      <main className={styles.main}>{children}</main>
    </>
  );
}
