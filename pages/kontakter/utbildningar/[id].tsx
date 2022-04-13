import React, { ReactElement, useEffect, useState } from 'react';
import EduInfo from "../../../src/components/education/eduInfo/EduInfo";
import Layout from '../../../src/layout/layout';

  const utbildningInfo = () => {
    return <EduInfo />;
  };

  utbildningInfo.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    );
  };

  export default utbildningInfo;