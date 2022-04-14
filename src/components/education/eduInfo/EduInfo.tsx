import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getEdu } from "../../../apis/edu/get";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Flex } from "../../ui/Flex"
import { EduInfoCard } from "./EduInfoCard";

import styles from "./EduInfo.module.scss";
import InfoLayout from "../../../layout/infoLayout";

interface IEduData {
  managementList: Array<string>;
  name: string;
  place: string;
  shortName: string;
  type: string;
  _id: string;
}

const EduInfo = () => {
    const router = useRouter();
    const userData = useLocalStorage("get", "session", "user");
    const { name, id } = router.query;
    const [dataEdu, setDataEdu] = useState<IEduData>();

    const getData = async () => {
        await getEdu(id).then(res => {
          setDataEdu(res?.data.data.edu)
        }).catch(err => {
          console.log(err)
        })
  }

      useEffect(() => {
        getData();
      }, [name, id])

    return (
      <InfoLayout title={dataEdu && dataEdu.shortName} subTitle={dataEdu && dataEdu.name} place={dataEdu && [dataEdu.place]} tags={dataEdu && dataEdu.managementList} >
        <Flex direction="row" class={styles.cardContainer} align={"center"} justify={"center"} width="full" height="full">
            <EduInfoCard data={dataEdu} />
        </Flex>
        </InfoLayout>
    )
}

export default EduInfo;