import React, { ReactElement, useEffect, useState } from 'react';
import { CorpCardInfo } from "../../../../src/components/corporate/CorpInfo/CorpCardInfo";
import Layout from '../../../../src/layout/layout';

  const foretagInfo = () => {
    return <CorpCardInfo />;
  };

  foretagInfo.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    );
  };

  export default foretagInfo;