import React, { ReactElement, useEffect } from 'react';

import { getLettersDataRedux } from '../src/store/slice/lettersData';
import { useDispatch } from 'react-redux';

/* Styling components */
import styles from '../styles/Overview.module.scss';

/* Components import */
import Milestones from '../src/components/overview/milestones/Milestones';
import Barchart from '../src/components/overview/barchart/Barchart';
import ProgressCard from '../src/components/overview/progress_card/ProgressCard';
import { Flex } from '../src/components/ui/Flex';
import Layout from '../src/layout/layout';

import { InfoCards } from '../src/components/overview/InfoCards/InfoCards';

const Overview = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLettersDataRedux());
  }, []);

  return (
    <>
      <div className={styles.overview_container}>
        <InfoCards />
        {/* <header>
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
        </header> */}
        <section className={styles.overview_content_container}>
          <Milestones />
          <Flex direction='row' justify='space-between' gap='xxx-large'>
            <Barchart />
            {/* <ProgressCard /> */}
          </Flex>
        </section>
      </div>
    </>
  );
};

Overview.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Overview;
