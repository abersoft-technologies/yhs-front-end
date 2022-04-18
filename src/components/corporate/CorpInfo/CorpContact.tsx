import { useEffect, useState } from "react";
import { Flex } from "../../ui/Flex";
import { Select } from "../../ui/form/select/Select";
import { CorpTag } from "./CorpTag"
import corpCardStyle from "./CorpCardInfo.module.scss";
import ContactCard from "./ContactCard";

interface ICorporateContactProps {
    corpData: any;
    contactData?: contacts;
    listValues: any;
}

interface contacts {
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
export const CorporateContact = ({corpData, contactData, listValues}: ICorporateContactProps) => {
    const [selectValueContact, setSelectValueContact] = useState<string>("");
    const [selectValueEmployements, setSelectValueEmployments] = useState<string>(employymentOptions[0].value);
    const [selectValueLia, setSelectValueLia] = useState<string>(employymentOptions[0].value);
    const [listContacts, setlistContacts] = useState<Array<IContactData>>([]);
    const [radioButtonList, setRadioButtonList] = useState(buttonArray);
    const [page, setPage] = useState(1);

    const createSelectArray = () => {
        if(contactData && contactData.contacts.length) {
            let list: Array<IContactData> = [];
            contactData.contacts.forEach((item: IContactData) => {
                list.push(item);
            })
            setlistContacts(list)
        }
    }

    useEffect(() => {
        createSelectArray();
    }, [contactData])

    return (
        <Flex direction="column" gap="large" width="full" class={corpCardStyle.card}>
            <h1>Anknyta kontakter</h1>
            {/* <Flex direction="row" width="full" gap="large">
                {corpData && corpData.tags.map((item: string, i: number) => {
                    return <CorpTag key={i} value={item} />
                })}
            </Flex> */}
            <section className={corpCardStyle.contact_list_container}>
                <div className={corpCardStyle.label_bar_container}>
                <div>Namn</div>
                <div>Ort</div>
                <div>Kontaktinfo.</div>
            </div>
            <div>
                {listContacts &&
                    listContacts.map((item: IContactData, i: number) => {
                        return (
                            <ContactCard
                                key={i}
                                firstName={item.firstName}
                                lastName={item.lastName}
                                district={item.town}
                                email={item.email}
                            />
                        );
                    })}
            </div>
            </section>
        </Flex>
    )
}