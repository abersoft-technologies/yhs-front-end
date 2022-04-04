import React, { Ref, useRef, useState } from 'react';
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
import AddCorporateModule from '../src/components/modules/add_data/AddCorporateModule';

const kontakter: NextPage = () => {
  const router = useRouter();
  const toggleRef = React.createRef<HTMLButtonElement>();
  const [contactModuleToggle, setContactModuleToggle] = useState<boolean>(false);
  const [corpModuleToggle, setCorpModuleToggle] = useState<boolean>(false);
  const [toggleButtons, setToggleButtons] = useState<boolean>(false);
  const [topPos, setTopPos] = useState<number>(0);



  const closeContactModule = () => setContactModuleToggle(false);
  const closeCorpModule = () => setCorpModuleToggle(false);

  const calculateDropdown = () => {
    if(toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      const tempTopPos = rect.bottom.toFixed(0);
      const number = parseInt(tempTopPos)
      setTopPos(number + 10)
    }
  }


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
          <Flex direction='column' gap='large' align='center' justify='center'>
          <Button
              iconRight={<img src='/arrow-toggle-down.svg' alt='toggle' />}
              size='xs'
              onClick={() => {
                setToggleButtons(!toggleButtons)
                calculateDropdown()
              }}
              auto
              ref={toggleRef}
              css={{
                background: '#7586ce',
                fontSize: '0.75rem',
                fontWeight: '400',
            }}>
            Lägg till
          </Button>
          {toggleButtons ?
          <div className={styles.buttons_container} style={{top: topPos}}>
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
              onClick={() => setCorpModuleToggle(!corpModuleToggle)}
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
          </div> : <></>
          }
          </Flex>
        </header>
        <ContactList />
      </div>
      <AddContactModule
        active={contactModuleToggle}
        closeModule={closeContactModule}
      />
      <AddCorporateModule
        active={corpModuleToggle}
        closeModule={closeCorpModule}/>
    </>
  );
};

export default kontakter;
