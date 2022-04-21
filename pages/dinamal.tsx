import { ReactElement } from 'react';
import React from 'react';
import Layout from '../src/layout/layout';
import Goals from '../src/components/goals/Goals';

const Dinamal = () => {
  return (
    <Goals />
  );
};

Dinamal.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dinamal;