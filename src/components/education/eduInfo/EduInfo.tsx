import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { getEdu } from "../../../apis/edu/get";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Flex } from "../../ui/Flex"
import { EduInfoCard } from "./EduInfoCard";

import styles from "./EduInfo.module.scss";
import InfoLayout from "../../../layout/infoLayout";
import { getAll } from "../../../apis/contact/getAll";
import Goals from "../../goals/Goals";

interface IGoalData {
  letters: number;
  employements: number;
  internships: number;
}

interface IEduData {
  managementList: Array<string>;
  name: string;
  place: string;
  shortName: string;
  type: string;
  goal?: IGoalData;
  _id: string;
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

const EduInfo = () => {
    const router = useRouter();
    const userData = useLocalStorage("get", "session", "user");
    const { name, id } = router.query;
    const [dataEdu, setDataEdu] = useState<IEduData>();
    const [ListData, setListData] = useState<Array<IContactData>>();
    const [list, setList] = useState<Array<string>>();

    const listDataLength = ListData && ListData?.length;

    const createContactsList = useCallback(() => {
      const list: Array<string> = [];
      if(dataEdu?.managementList && dataEdu.managementList.length) {
        dataEdu.managementList.forEach(item => {
              const obj = ListData?.find(contact => contact._id === item);
              if(obj) {
                  list.push(obj.firstName + " " +  obj.lastName)
              }
          })
      }
      setList(list)
  }, [ListData, dataEdu?.managementList])

    const getData = useCallback( async () => {
        await getEdu(id).then(res => {
          setDataEdu(res?.data.data.edu)
        }).catch(err => {
          console.log(err)
        })
  }, [id])

  const getAllContacts = useCallback( async () => {
    await getAll().then(res => {
      console.log("RES CONTACTS --->", res?.data)
      setListData(res?.data.data.contactList)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    getData();
    getAllContacts();
    createContactsList();
  }, [])

  //name, id, list?.length, ListData?.length, createContactsList, getData

    return (
      <InfoLayout title={dataEdu && dataEdu.shortName} subTitle={dataEdu && dataEdu.name} place={dataEdu && [dataEdu.place]} tags={list} >
        <Flex direction="column" class={styles.cardContainer} align={"center"} justify={"space-around"} width="full" height="full">
            <EduInfoCard data={dataEdu} contactList={ListData} />
            <Goals id={id as string} currentGoals={dataEdu?.goal} />
        </Flex>
        </InfoLayout>
    )
}

export default EduInfo;