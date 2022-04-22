import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import styles from '../../styles/Layout.module.scss';

/* Components for layout */
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';
import { useWindowSize } from '../hooks/useWindowSize';
import { InfoBox } from '../components/ui/info/InfoBox';
import { useSelector } from 'react-redux';

interface ILayoutProps {
  children: React.ReactNode;
  doNotShowSidebar?: boolean;
}

interface IInfoBoxProps {
  infoText: string;
  type?: 'warning' | 'info' | 'tip' | 'success';
  showBox: boolean;
  time: number;
}

export default function Layout({ children }: ILayoutProps) {
  const windowSize = useWindowSize();

  const [narrow, setNarrow] = useState(false);
  const [showBarItems, setShowBarItems] = useState(false);
  const [late, setLate] = useState(false);

  // const infoBoxReducer: IInfoBoxProps = useSelector(
  //   (state: any) => state.infoBoxReducer
  // );

  useEffect(() => {
    if (windowSize.width && windowSize?.width < 1440 && !narrow) {
      handleToggleSidebar();
    }
    if (windowSize.width && windowSize?.width > 1440 && narrow) {
      handleToggleSidebar();
    }
  }, [windowSize]);

  const handleToggleSidebar = () => {
    setNarrow(!narrow);
    if (!narrow) {
      setShowBarItems(true);
      setLate(true);
    } else {
      setTimeout(() => {
        setLate(false);
        setShowBarItems(false);
      }, 400);
    }
  };
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
      <Sidebar showBarItems={showBarItems} narrow={narrow} late={late} />
      <Topbar handleToggleSidebar={handleToggleSidebar} narrow={narrow} />
      <main className={`${styles.main} ${narrow && styles.main_narrow}`}>
        {children}
        <InfoBox />
      </main>
    </>
  );
}
