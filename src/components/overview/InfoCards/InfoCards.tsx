import { Flex } from "../../ui/Flex"
import { Text } from "../../ui/text/Text";

import styles from "./InfoCards.module.scss"

interface ICardProps {
    text: string;
    number: string;
}

export const InfoCards = () => {
    const list = [{text: "Avsiktsförklaringar", value: "21"}, {text: "LIA Platser", value: "17"}, {text: "Placeholder", value: "80"}, {text: "Anställningar", value: "45"}];

    return (
        <Flex direction="row" width="full" justify="space-between" class={styles.container}>
            {list.map((item, i) => {
                return <Card key={i} text={item.text} number={item.value}  />
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

