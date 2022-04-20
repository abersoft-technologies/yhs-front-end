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

export const InfoBox = ({infoText, type, showBox, time}: IInfoBoxProps) => {
    const dispatch = useDispatch();
    const infoBoxRedux = useSelector((state: RootState) => state.infoBoxReducer)

    useEffect(() => {
        setTimeout(() => {
            dispatch(showInfoBox({infoText: "", showBox: false, time: 0}))
        }, infoBoxRedux.time);
    }, [infoBoxRedux.showBox])

    const renderContent = () => {
        let content = <></>
        switch(type) {
            case "warning":
                content = (
                    <div className={`${styles.container} ${styles.warningBox}`}>
                        <Text text={infoText} />
                    </div>
                )
            break;
            case "info":
                content = (
                    <div className={`${styles.container} ${styles.infoBox}`}>
                        <Text text={infoText} />
                    </div>
                )
            break;
            case "tip":
                content = (
                    <div className={`${styles.container} ${styles.tipBox}`}>
                        <Text text={infoText} />
                    </div>
                )
            break;
            case "success":
                content = (
                    <div className={`${styles.container} ${styles.successBox}`}>
                        <Text text={infoText} />
                    </div>
                )
            break;
        }

        return content;
    }

    return (
        showBox ?
            renderContent()
        : null
    )
}