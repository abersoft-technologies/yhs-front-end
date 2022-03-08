import { NextPage } from 'next';
import React from 'react';

import styles from '../styles/Contacts.module.scss';

import ContactList from '../src/components/contacts/ContactList';

const kontakter: NextPage = () => {
  return (
    <>
      <div className={styles.contacts_container}>
        <header>
          <div className={styles.header_bar_container}>
            <div>
              <h2>Kontakter</h2>
            </div>
            <div>
              <button>
                <img src='/add-contact.svg' alt='Add contact' /> Kontakt
              </button>
              <button>
                <img src='/add-company.svg' alt='Add contact' />
                Företag
              </button>
            </div>
          </div>
          <div className={styles.header_interface_container}>
            <div>
              <img src='/magnifying-glass.svg' alt='Magnifying glass' />
              <input type='text' placeholder='Sök bland kontakter...' />
            </div>
            <button>
              <img src='/filter-icon.svg' alt='Filter icon' /> Filter
            </button>
          </div>
        </header>
        <ContactList />
      </div>
    </>
  );
};

export default kontakter;
