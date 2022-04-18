import react, {useEffect, useState} from "react";
import { Flex } from "../../ui/Flex";
import { Text } from "../../ui/text/Text";

import listStyles from "./EduInfo.module.scss"
import EduListCard from "./EduListCard";

import ManagementListCard from "./ManagementListCard"

interface IEduInfoCardProps {
    data?: IEduData;
    contactList?: Array<IContactData>;
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


interface IEduData {
    managementList: Array<string>;
    name: string;
    place: string;
    shortName: string;
    type: string;
    _id: string;
}

export const EduInfoCard = ({data, contactList}: IEduInfoCardProps) => {
    const [contacts, setContacts] = useState<Array<IContactData>>([])
    useEffect(() => {
        createContactsList()
        console.log("Contacts", contacts)
    }, [data, contactList, contacts.length])

    const createContactsList = () => {
        const list: Array<IContactData> = [];
        if(data?.managementList && data.managementList.length) {
            data.managementList.forEach(item => {
                const obj = contactList?.find(contact => contact._id === item);
                if(obj) {
                    list.push(obj)
                }
            })
        }
        setContacts(list)
        console.log("list", list)
    }

    return (
        <Flex direction="column" gap="large" width="full" class={listStyles.card}>
            <Text textSize="x-large" text={data && data.name ? data.name : ""}/>

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
            <section>
            <div className={listStyles.label_contact_bar_container}>
                <div>Namn</div>
                <div>Ort</div>
                <div>Email</div>
                <div>Nummer</div>
                </div>
                <div></div>
            </section>
            <div>
                {contacts && contacts.length ? contacts.map((item, i) => {
                    return <ManagementListCard
                        key={i}
                        name={item.firstName + " " + item.lastName}
                        place={item.town}
                        email={item.email}
                        phone={item.phoneNumber}
                    />

                }) : null}
            </div>
        </Flex>
    )
}