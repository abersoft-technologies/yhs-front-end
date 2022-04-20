import React, {useEffect} from 'react';
import Head from 'next/head';

import styles from '../../styles/Layout.module.scss';

/* Components for layout */
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';
import {InfoBox} from '../components/ui/info/InfoBox';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ILayoutProps {
  children: React.ReactNode;
  doNotShowSidebar?: boolean;
}

interface IInfoBoxProps {
  infoText: string;
  type?: "warning" | "info" | "tip" | "success";
  showBox: boolean;
  time: number;
}

export default function Layout({ children }: ILayoutProps) {
  let infoBoxState: IInfoBoxProps = {infoText: "", showBox: false, time: 0}
  const infoBoxRedux = useSelector((state: RootState) => state.infoBoxReducer)
  useEffect(() => {
    infoBoxState = infoBoxRedux;
  }, [infoBoxRedux])
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

      <main className={styles.main}>
        {children}
        <InfoBox infoText={infoBoxRedux.infoText} showBox={infoBoxRedux.showBox} time={infoBoxRedux.time} type={infoBoxRedux.type} />
        </main>
    </>
  );
}
