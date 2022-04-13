import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getEdu } from "../../../apis/edu/get";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Flex } from "../../ui/Flex"
import { EduInfoCard } from "./EduInfoCard";

import styles from "./EduInfo.module.scss";

const EduInfo = () => {
    const router = useRouter();
    const userData = useLocalStorage("get", "session", "user");
    const { name, id } = router.query;
    const [dataEdu, setDataEdu] = useState<any>();

    const getData = async () => {
        await getEdu(id).then(res => {
          setDataEdu(res?.data.data.edu)
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
            <EduInfoCard data={dataEdu} />
        </Flex>
    )
}

export default EduInfo;