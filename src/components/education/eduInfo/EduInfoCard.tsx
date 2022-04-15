import react, {useEffect} from "react";
import { Flex } from "../../ui/Flex";
import { Text } from "../../ui/text/Text";

import listStyles from "./EduInfo.module.scss"
import EduListCard from "./EduListCard";

interface IEduInfoCardProps {
    data?: IEduData;
}

interface IEduData {
    managementList: Array<string>;
    name: string;
    place: string;
    shortName: string;
    type: string;
    _id: string;
}

export const EduInfoCard = ({data}: IEduInfoCardProps) => {

    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <Flex direction="column" gap="large" width="full" class={listStyles.card}>
            <Text textSize="x-large" text={data && data.name ? data.name : ""}/>
            <Flex direction="column">
            <Text text="Ledningsgrupp" textSize="large" mY="x-small" />
                <Flex direction="row" gap="medium">
                <ul className={listStyles.managementList}>
                {data && data.managementList.length ? data.managementList.map((item, i) => {
                    return <li>{item}</li>


                }) : <Text text="Ingen i ledningsgruppen" />}
                </ul>
                </Flex>

            </Flex>
            <section className={listStyles.edu_list_container}>
                <div className={listStyles.label_bar_container}>
                <div>Förkortning</div>
                <div>typ</div>
                <div>Ort</div>
                </div>
                <div></div>
            <div>
                <EduListCard
                    shortName={data && data.shortName}
                    type={data && data.type}
                    place={data && data.place}
                    _id={data && data._id}
                />
            </div>
            </section>
        </Flex>
    )
}