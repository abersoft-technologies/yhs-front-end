import React, {useEffect, useState} from "react";
import { Flex } from "../../ui/Flex";
import { CorporateContact } from "./CorpContact";

import styles from "./CorpCardInfo.module.scss"
import { useRouter } from "next/router";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { getContactsInCorp, getCorp } from "../../../apis/corp/get";

interface IEduCardInfoProps {
    // contacts?: Array<any>;
    // tags?: Array<string>
    // corpData: any;
}

interface IOptionObject {
  value: string;
  label: string;
}

interface IContactData {
  company: string;
  date: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  status: string;
  town: string;
  _id: string;
}

export const CorpCardInfo = () => {
    const router = useRouter();
    const userData = useLocalStorage("get", "session", "user");
    const { name, id } = router.query;
    const [dataCorp, setDataCorp] = useState<any>();
    const [dataContacts, setDataContacts] = useState<any>();



    const getData = async () => {
          await getCorp(id).then(res => {
            setDataCorp(res?.data.data.corp)
          }).catch(err => {
            console.log(err)
          })

          getContactsInCorp(name).then(res => {
            setDataContacts(res?.data.data)
          }).catch(err => {
            console.log(err)
          })

          // dispatch(getCorporateRedux({id: id}));
          // dispatch(getContactListRedux({ limit: 10, page: 1, queryParams: 'KYH' }));
    }

        useEffect(() => {
          getData();
        }, [name, id])


    return (
        <Flex direction="row" class={styles.cardContainer} align={"center"} justify={"center"} width="full" height="full">
          <CorporateContact corpData={dataCorp} contactData={dataContacts} />
        </Flex>
    )
}
