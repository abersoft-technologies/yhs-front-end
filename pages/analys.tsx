import { ReactElement } from 'react';
import React from 'react';
import Layout from '../src/layout/layout';

const Analys = () => {
  return (
    <div>
      <h1>ANALYS</h1>
    </div>
  );
};

Analys.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Analys;
