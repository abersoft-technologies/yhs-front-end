import { useEffect, useState } from "react";
import { Flex } from "../../ui/Flex";
import { Select } from "../../ui/form/select/Select";
import { CorpTag } from "./CorpTag"

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

export const CorporateContact = ({corpData, contactData}: ICorporateContactProps) => {
    const [selectValue, setSelectValue] = useState<string>("");
    const [optionsList, setOptionsList] = useState<Array<IOptionObject>>([]);

    const createSelectArray = () => {
        if(contactData) {
            let list: Array<IOptionObject> = [{value: "", label: ""}];
            contactData.contacts.forEach((item: IContactData) => {
                list.push({value: item.firstName + " " + item.lastName, label: item.firstName + " " + item.lastName});
            })
            setOptionsList(list)
            setSelectValue(list[1].value)
        }
    }

    const onChangeSelect = (e: React.MouseEvent<HTMLDivElement>) => {
        setSelectValue(e.currentTarget.id);
    }

    useEffect(() => {
        createSelectArray();
    }, [contactData])

    return (
        <Flex direction="column" gap="large">
            <h1>Anknyta kontakter</h1>
            <Select value={selectValue} options={optionsList ? optionsList : []} onChangeFunction={onChangeSelect} label="Kontakter" />
            <Flex direction="row" gap="large">
                {corpData && corpData.tags.map((item: string, i: number) => {
                    return <CorpTag key={i} value={item} />
                })}
            </Flex>
        </Flex>
    )
}