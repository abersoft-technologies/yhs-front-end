import React from 'react';
import ContactListData from '../../apis/mock/ContactList.json';

import styles from './Contactlist.module.scss';

interface IContactCardProps {
  i: number;
  name?: string;
  company?: string;
  role?: string;
  district?: string;
  contact_information?: { email: string; phone_number: string };
}

const ContactList = () => {
  const { ListData } = ContactListData;
  const ContactCard = ({
    i,
    name,
    company,
    role,
    district,
    contact_information,
  }: IContactCardProps) => (
    <article
      style={i % 2 === 0 ? { background: '#FBFBFB' } : { background: 'white' }}
      className={styles.contact_card}
    >
      <div>{name}</div>
      <div>{company}</div>
      <div>{role}</div>
      <div>{district}</div>
      <div>
        {contact_information?.email
          ? contact_information.email
          : 'Ingen assosierad email'}
      </div>
    </article>
  );

  console.log(ListData);
  return (
    <section className={styles.contact_list_container}>
      <div className={styles.label_bar_container}>
        <div>Namn</div>
        <div>Företag</div>
        <div>Roll</div>
        <div>Ort</div>
        <div>Kontaktinfo.</div>
      </div>
      <div>
        {ListData.map((item, i) => {
          return (
            <ContactCard
              key={i}
              i={i}
              name={item.name}
              company={item.company}
              role={item.role}
              district={item.district}
              contact_information={item.contact_information}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ContactList;
