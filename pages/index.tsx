import React from 'react';
import type { NextPage } from 'next';

import styles from '../styles/Overview.module.scss';

import Milestones from '../src/components/overview/milestones/Milestones';
import Barchart from '../src/components/overview/barchart/Barchart';
import ProgressCard from '../src/components/overview/progress_card/ProgressCard';
import { Flex } from '../src/components/ui/Flex';

const Overview: NextPage = () => {
  return (
    <>
      <div className={styles.overview_container}>
        <header>
          <div className={styles.header_bar_container}>
            <div>
              <h2>Överblick</h2>
            </div>
            <div>
              <button>
                <img src='/achievement-icon.svg' alt='Add contact' /> Sätt dina
                mål
              </button>
            </div>
          </div>
        </header>
        <section className={styles.overview_content_container}>
          <Milestones />
          <Flex direction='row' justify='space-between' gap='xxx-large'>
            <Barchart />
            <ProgressCard />
          </Flex>
        </section>
      </div>
    </>
  );
};

export default Overview;
