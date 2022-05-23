import React from 'react';
import { ReactElement } from 'react';

import styles from '../styles/Analytics.module.scss';

import Layout from '../src/layout/layout';

import { Flex } from '../src/components/ui/Flex';
import LineChart from '../src/components/analytics/linechart/Linechart';
import LineChartSmall from '../src/components/analytics/linechart/SmallLineChart';
import Barchart from '../src/components/analytics/barchart/Barchart';
import CircleChart from '../src/components/analytics/circlechart/Circlechart';

const Analys = () => {
  return (
    <Flex direction='column' class={styles.analytics}>
      {/* <LineChart /> */}
      {/* <LineChartSmall /> */}
      <Flex
        direction='row'
        width='full'
        gap='large'
        class={styles.charts_container}
      >
        <div>
          <Barchart />
        </div>
        <div>
          <CircleChart />
        </div>
      </Flex>
    </Flex>
  );
};

Analys.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Analys;
