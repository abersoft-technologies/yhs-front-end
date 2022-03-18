import React from 'react';
import ContactListData from '../../apis/mock/ContactList.json';

import styles from './Contactlist.module.scss';

import Pagination from '../pagination/Pagination';
import ContactCard from './contact_card/ContactCard';

const ContactList = () => {
  const { ListData } = ContactListData;

  return (
    <>
      <section className={styles.contact_list_container}>
        <div className={styles.label_bar_container}>
          <div>Namn</div>
          <div>
            <div>Företag</div>
            <div>Roll</div>
          </div>
          <div>Ort</div>
          <div>Status</div>
          <div>Kontaktinfo.</div>
        </div>
        <div>
          {ListData.slice(0, 10).map((item, i) => {
            return (
              <ContactCard
                key={i}
                i={i}
                name={item.name}
                company={item.company}
                role={item.role}
                district={item.district}
                status={item.status}
                contact_information={item.contact_information}
              />
            );
          })}
        </div>
      </section>
      <Pagination />
    </>
  );
};

export default ContactList;
