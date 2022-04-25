import { ReactElement } from 'react';
import React from 'react';
import Layout from '../src/layout/layout';
import { Flex } from '../src/components/ui/Flex';

const Analys = () => {
  return (
    <Flex
      direction='column'
      width='full'
      height='full'
      justify='center'
      align='center'
    >
      <h1>Under konstruktion </h1>
      <span style={{ fontSize: '6rem' }}>🚧</span>
    </Flex>
  );
};

Analys.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Analys;
