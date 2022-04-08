import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CorpCardInfo } from "../../../src/components/corporate/CorpInfo/CorpCardInfo";
import { Flex } from '../../../src/components/ui/Flex';
import Layout from '../../../src/layout/layout';
import { getContactListRedux } from '../../../src/store/slice/contactList';
import { getCorporateListRedux } from '../../../src/store/slice/corpList';
import ContactLayout from '../../../src/layout/contactLayout';


const foretagInfo = () => {
    // const dispatch = useDispatch();

    // const corpListReducer = useSelector(
    //     (state: any) => state.corpListReducer
    //   );
    //   const contactListReducer = useSelector(
    //     (state: any) => state.contactListReducer
    //   );
    //   const ListDataCorp = corpListReducer.result.data ? corpListReducer.result.data.corpList : undefined;
    //   const listValuesCorp = corpListReducer.result.data ? corpListReducer.result.data.listValues : undefined;

    //   const ListDataContacts = contactListReducer.result.data ? contactListReducer.result.data.contactList : undefined;
    //   const listValuesContacts = contactListReducer.result.data ? contactListReducer.result.data.listValues : undefined;

    //   useEffect(() => {
    //     dispatch(getCorporateListRedux({ limit: 10, page: 1, queryParams: '' }));
    //     dispatch(getContactListRedux({ limit: 10, page: 1, queryParams: 'KYH' }));
    //     console.log("dataCorp",ListDataCorp)
    //   }, []);
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