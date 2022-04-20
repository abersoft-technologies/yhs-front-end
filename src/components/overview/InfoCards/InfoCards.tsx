import react, { useEffect, useState } from "react";
import { Flex } from "../../ui/Flex"
import { Text } from "../../ui/text/Text";
import {getAllLetters} from "../../../apis/letter/get"

import styles from "./InfoCards.module.scss"

interface ICardProps {
    text: string;
    number: string;
}

interface ILetter {
    edu: string[],
    employment: string,
    internship: string,
    readEdu: boolean,
    contributeEdu: boolean,
    lecture: boolean,
    studyVisit: boolean,
    eduBoard: boolean,
}

export const InfoCards = () => {
    const [letters, setLetters] = useState<Array<ILetter>>([])
    const lettersLength = letters ? letters.length : 0;
    const list = [{text: "Avsiktsförklaringar", value: lettersLength.toString()}, {text: "LIA Platser", value: "17"}, {text: "Placeholder", value: "80"}, {text: "Anställningar", value: "45"}];
    const getData = async () => {
        await getAllLetters().then(res => {
            const data = res?.data;
            setLetters(data.data)
            console.log("JP data", data.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Flex direction="row" width="full" justify="space-between" class={styles.container}>
            {list.map((item, i) => {
                return <Card key={i} text={item.text} number={item.value} />
            })}
        </Flex>
    )
}

const Card = ({text, number}: ICardProps) => {
    return (<Flex direction="column" align="center" justify="center" class={styles.card}>
        <Text text={text} />
        <Text text={number} />
    </Flex>
    )
}

