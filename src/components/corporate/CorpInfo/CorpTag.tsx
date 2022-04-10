import React, {useEffect, useState} from "react";
import { Flex } from "../../ui/Flex";
import styles from "./CorpTag.module.scss"

interface ICorpTag {
    value: string;
}

export const CorpTag = ({value}: ICorpTag) => {
    return (
        <Flex direction="row" class={styles.container} align="center" gap="x-small">
            <img src="/cross.svg" alt="cross" />
            <span className={styles.value}>{value}</span>
        </Flex>
    )
}