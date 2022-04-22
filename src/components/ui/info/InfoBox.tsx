import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {showInfoBox} from "../../../store/slice/infoBox"
import { RootState } from "../../../store/store";

import { Text } from "../text/Text"

interface IInfoBoxProps {
    infoText: string;
    type?: "warning" | "info" | "tip" | "success";
    showBox: boolean;
    time: number;
}

import styles from "./InfoBox.module.scss";

export const InfoBox = () => {
    const dispatch = useDispatch();
    const infoBoxRedux = useSelector((state: RootState) => state.infoBoxReducer)

    useEffect(() => {
        setTimeout(() => {
            dispatch(showInfoBox({infoText: "", time: 0}))
        }, infoBoxRedux.time);
    }, [infoBoxRedux.infoText])

    const renderContent = () => {
        let content = <></>
        switch(infoBoxRedux.type) {
            case "warning":
                content = (
                    <div className={`${styles.container} ${styles.warningBox}`}>
                        <Text text={infoBoxRedux.infoText} />
                    </div>
                )
            break;
            case "info":
                content = (
                    <div className={`${styles.container} ${styles.infoBox}`}>
                        <Text text={infoBoxRedux.infoText} />
                    </div>
                )
            break;
            case "tip":
                content = (
                    <div className={`${styles.container} ${styles.tipBox}`}>
                        <Text text={infoBoxRedux.infoText} />
                    </div>
                )
            break;
            case "success":
                content = (
                    <div className={`${styles.container} ${styles.successBox}`}>
                        <Text text={infoBoxRedux.infoText} />
                    </div>
                )
            break;
        }

        return content;
    }

    return (
        infoBoxRedux.infoText !== "" ?
            renderContent()
        : null
    )
}