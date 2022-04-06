import React, { ReactElement } from 'react';
import ContactList from '../../src/components/contacts/ContactList';

import Layout from '../../src/layout/layout';
import ContactLayout from '../../src/layout/contactLayout';

const kontakter = () => {
  return (
    <>
      <ContactList />
    </>
  );
};

kontakter.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <ContactLayout>{page}</ContactLayout>
    </Layout>
  );
};

export default kontakter;
