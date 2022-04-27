import React, {useCallback, useEffect, useState} from "react";
import { Flex } from "../../ui/Flex";
import { CorporateContact } from "./CorpContact";

import styles from "./CorpCardInfo.module.scss"
import { useRouter } from "next/router";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { getContactsInCorp, getCorp } from "../../../apis/corp/get";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import InfoLayout from "../../../layout/infoLayout";

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

interface contacts {
  contacts: Array<IContactData>;
}

export const CorpCardInfo = () => {
    const router = useRouter();
    const userData = useLocalStorage("get", "session", "user");
    const { name, id } = router.query;
    const [dataCorp, setDataCorp] = useState<any>();
    const [dataContacts, setDataContacts] = useState<contacts>();
    const [placeList, setPlaceList] = useState<Array<string>>();

    const dispatch = useAppDispatch();

  const contactListReducer = useAppSelector(
    (state: any) => state.contactListReducer
  );

    const listValues = contactListReducer.result.data
    ? contactListReducer.result.data.listValues
    : undefined;

    const getData = useCallback(async () => {
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
    }, [id, name])

    const createPlaceArray = () => {
      const list: string[] = [];
      if(dataContacts && dataContacts.contacts.length) {
        dataContacts.contacts.forEach((item) => {
          list.push(item.town)
        })
      }
      let uniqueList = list.filter((c, index) => {
        return list.indexOf(c) === index;
      });
      setPlaceList(uniqueList)
    }

        useEffect(() => {
          getData();
          // createPlaceArray();
          const list: string[] = [];
          if(dataContacts && dataContacts.contacts.length) {
            dataContacts.contacts.forEach((item) => {
              list.push(item.town)
            })
          }
          let uniqueList = list.filter((c, index) => {
            return list.indexOf(c) === index;
          });
          setPlaceList(uniqueList)
        }, [name, id, dataContacts?.contacts.length, dataContacts, getData])


    return (
      <InfoLayout title={dataCorp && dataCorp.name} subTitle={dataCorp && dataCorp.name} tags={dataCorp && dataCorp.tags} place={placeList} info={dataCorp && dataCorp.info} >
        <Flex direction="row" class={styles.cardContainer} align={"center"} justify={"center"} width="full" height="full">
          <CorporateContact corpData={dataCorp} contactData={dataContacts} listValues={listValues} />
        </Flex>
        </InfoLayout>
    )
}
