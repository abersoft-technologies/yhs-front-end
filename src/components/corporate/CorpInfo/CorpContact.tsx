import { useEffect, useState } from "react";
import { Flex } from "../../ui/Flex";
import { Select } from "../../ui/form/select/Select";
import { CorpTag } from "./CorpTag"

import styles from "./CorpCardInfo.module.scss"

interface ICorporateContactProps {
    corpData: any;
    contactData: ContactObject;
}

interface ContactObject {
    contacts: Array<IContactData>;
}

interface IContactData {
    company: string;
    date: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
    status: string;
    town: string;
    _id: string;
}

interface IOptionObject {
    value: string;
    label: string;
}

const employymentOptions = [
    {value: "0 - 1", label: "0 - 1"},
    {value: "1 - 2", label: "1 - 2"},
    {value: "2 - 3", label: "2 - 3"},
    {value: "3 - 4", label: "3 - 4"},
]

const liaOptions = [
    {value: "1", label: "1"},
    {value: "2", label: "2"},
    {value: "3", label: "3"},
    {value: "4", label: "4"},
]

const buttonArray = [
    {value: "Insatt i utb.p"},
    {value: "Bidrag till utb."},
    {value: "Föreläsningar"},
    {value: "Studiebesök"},
    {value: "LG"},
]
export const CorporateContact = ({corpData, contactData}: ICorporateContactProps) => {
    const [selectValueContact, setSelectValueContact] = useState<string>("");
    const [selectValueEmployements, setSelectValueEmployments] = useState<string>(employymentOptions[0].value);
    const [selectValueLia, setSelectValueLia] = useState<string>(employymentOptions[0].value);
    const [optionsListContacts, setOptionsListContacts] = useState<Array<IOptionObject>>([]);
    const [radioButtonList, setRadioButtonList] = useState(buttonArray);

    const createSelectArray = () => {
        if(contactData) {
            let list: Array<IOptionObject> = [{value: "", label: ""}];
            contactData.contacts.forEach((item: IContactData) => {
                list.push({value: item.firstName + " " + item.lastName, label: item.firstName + " " + item.lastName});
            })
            setOptionsListContacts(list)
            setSelectValueContact(list[1] ? list[1].value : "")
        }
    }

    const onChangeSelectContacts = (e: React.MouseEvent<HTMLDivElement>) => {
        setSelectValueContact(e.currentTarget.id);
    }

    const onChangeSelectEmployement = (e: React.MouseEvent<HTMLDivElement>) => {
        setSelectValueEmployments(e.currentTarget.id);
    }

    const onChangeSelectLia = (e: React.MouseEvent<HTMLDivElement>) => {
        setSelectValueLia(e.currentTarget.id);
    }

    useEffect(() => {
        createSelectArray();
    }, [contactData])

    return (
        <Flex direction="column" gap="large">
            <h1>Anknyta kontakter</h1>
            <Select width="100%" value={selectValueContact} options={optionsListContacts ? optionsListContacts : []} onChangeFunction={onChangeSelectContacts} label="Kontakter" />
            <Flex direction="row" justify="space-between" width="full">
                {corpData && corpData.tags.map((item: string, i: number) => {
                    return <CorpTag key={i} value={item} />
                })}
            </Flex>
            <Flex direction="row" justify="space-between" width="auto">
                <Select width="250px" value={selectValueEmployements} options={employymentOptions} label="Anställningar" onChangeFunction={onChangeSelectEmployement} />
                <Select width="250px" value={selectValueLia} options={liaOptions} label="LIA" onChangeFunction={onChangeSelectLia} />
            </Flex>
            <Flex direction="row" gap="large" wrap="wrap" class={styles.buttonContainer}>
                {radioButtonList.map((item, i) => {
                    return <span key={i}>{item.value} <input type={"checkbox"} /></span>
                })}
            </Flex>
        </Flex>
    )
}