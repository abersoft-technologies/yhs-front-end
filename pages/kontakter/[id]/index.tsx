import React, { ReactElement, useEffect, useState } from 'react';
import ContactInfo from "../../../src/components/contacts/contact_info/ContactInfo";
import Layout from '../../../src/layout/layout';

  const kontaktInfo = () => {
    return <ContactInfo />;
  };

  kontaktInfo.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    );
  };

  export default kontaktInfo;