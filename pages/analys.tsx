import React from 'react';
import { ReactElement } from 'react';

import styles from '../styles/Analytics.module.scss';

import Layout from '../src/layout/layout';

import LineChart from '../src/components/analytics/linechart/Linechart';
import Barchart from '../src/components/analytics/barchart/Barchart';

const Analys = () => {
  return (
    <div className={styles.analytics}>
      <div>
        <Barchart />
      </div>
      <div>
        <LineChart />
      </div>
    </div>
  );
};

Analys.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Analys;
