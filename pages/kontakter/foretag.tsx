import React, { ReactElement } from 'react';

import CorporateList from '../../src/components/corporate/CorporateList';
import ContactLayout from '../../src/layout/contactLayout';
import Layout from '../../src/layout/layout';

const foretag = () => {
  return <CorporateList />;
};

foretag.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <ContactLayout>{page}</ContactLayout>
    </Layout>
  );
};

export default foretag;
