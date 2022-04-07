import React, { ReactElement } from 'react';

import EduList from '../../src/components/education/EduList';
import ContactLayout from '../../src/layout/contactLayout';
import Layout from '../../src/layout/layout';

const utbildningar = () => {
  return <EduList />;
};

utbildningar.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <ContactLayout>{page}</ContactLayout>
    </Layout>
  );
};

export default utbildningar;
