import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactListRedux } from '../../store/slice/contactList';

import styles from './Contactlist.module.scss';

import Pagination from '../pagination/Pagination';
import ContactCard from './contact_card/ContactCard';

interface IListDataMap {
  firstName: string;
  lastName: string;
  company: string;
  role?: string;
  town?: string;
  status: string;
  email?: string;
  phoneNumber?: string;
}

const ContactList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const contactListReducer = useSelector(
    (state: any) => state.contactListReducer
  );

  const ListData = contactListReducer.result.data ? contactListReducer.result.data.contactList : undefined;
  const listValues = contactListReducer.result.data ? contactListReducer.result.data.listValues : undefined;

  useEffect(() => {
    dispatch(getContactListRedux({ limit: 10, page: page, queryParams: '' }));
  }, [page]);

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
          {ListData &&
            ListData.map((item: IListDataMap, i: number) => {
              return (
                <ContactCard
                  key={i}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  company={item.company}
                  role={item.role}
                  district={item.town}
                  status={item.status}
                  email={item.email}
                  phoneNumber={item.phoneNumber}
                />
              );
            })}
        </div>
      </section>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={listValues ? listValues.totalPages : 0}
      />
    </>
  );
};

export default ContactList;
