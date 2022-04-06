import React, { ReactElement } from 'react';

import ContactLayout from '../../src/layout/contactLayout';
import Layout from '../../src/layout/layout';

const foretag = () => {
  return <div>Här ska list-componenten vara</div>;
};

foretag.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <ContactLayout>{page}</ContactLayout>
    </Layout>
  );
};

export default foretag;
