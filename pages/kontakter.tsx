import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from '../styles/Contacts.module.scss';

/* NextUI elements imports */
import { Button } from '@nextui-org/react';

/* Components imports */
import { Flex } from '../src/components/ui/Flex';
import ContactList from '../src/components/contacts/ContactList';
import AddContactModule from '../src/components/modules/add_data/AddContactModule';

const kontakter: NextPage = () => {
  const router = useRouter();
  const [contactModuleToggle, setContactModuleToggle] =
    useState<boolean>(false);

  const closeContactModule = () => setContactModuleToggle(false);

  return (
    <>
      <div className={styles.contacts_container}>
        <nav>
          <ul>
            <li
              className={
                router.pathname === '/kontakter' ? styles.active_link : ''
              }
            >
              <Link href='/kontakter'>Kontaker</Link>
            </li>
            <li>
              <Link href='/kontakter/företag'>Företag</Link>
            </li>
            <li>
              <Link href='/kontakter/alla'>Alla</Link>
            </li>
          </ul>
        </nav>
        <header className={styles.contact_header}>
          <div className={styles.header_interface_container}>
            <div>
              <img src='/magnifying-glass.svg' alt='Magnifying glass' />
              <input type='text' placeholder='Sök bland kontakter...' />
            </div>
            <button>
              <img src='/filter-icon.svg' alt='Filter icon' /> Filter
            </button>
          </div>

          <Flex direction='row' gap='large'>
            <Button
              onClick={() => setContactModuleToggle(!contactModuleToggle)}
              auto
              icon={<img src='/add-contact.svg' alt='Add contact' />}
              size='sm'
              css={{
                background: '#7586ce',
                fontSize: '1rem',
                fontWeight: '400',
              }}
            >
              Kontakt
            </Button>
            <Button
              icon={<img src='/add-company.svg' alt='Add compnay' />}
              auto
              size='sm'
              css={{
                background: '#7586ce',
                fontSize: '1rem',
                fontWeight: '400',
              }}
            >
              Företag
            </Button>
          </Flex>
        </header>
        <ContactList />
      </div>
      <AddContactModule
        active={contactModuleToggle}
        closeModule={closeContactModule}
      />
    </>
  );
};

export default kontakter;
