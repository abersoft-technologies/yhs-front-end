import React from "react";
import { Flex } from "../../ui/Flex";
import { CorporateContact } from "./CorpContact";

import styles from "./CorpCardInfo.module.scss"

interface IEduCardInfoProps {
    contacts?: Array<any>;
    tags?: Array<string>
}

export const CorpCardInfo = ({contacts, tags}: IEduCardInfoProps) => {
    // console.log("CONTACTS AND TAGS:", tags)
    return (
        <Flex direction="row" class={styles.cardContainer} align={"center"} justify={"center"} width="full" height="full">
            <CorporateContact />
        </Flex>
    )
}
