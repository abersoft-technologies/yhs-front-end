import React from "react";

import { Text } from "../text/Text"

interface IInfoBoxProps {
    infoText: string;
    type: "warning" | "info" | "tip" | "success";
    showBox: boolean;
}

import styles from "./InfoBox.module.scss";

export const InfoBox = ({infoText, type, showBox}: IInfoBoxProps) => {

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