import React, { useEffect, useState } from 'react';
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
import { OutlinedButton } from '../src/components/ui/buttons/Buttons';

const kontakter: NextPage = () => {
  const router = useRouter();
  const toggleRef = React.createRef<HTMLDivElement>();


  const [contactModuleToggle, setContactModuleToggle] = useState<boolean>(false);
  const [corpModuleToggle, setCorpModuleToggle] = useState<boolean>(false);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);


  const closeContactModule = () => setContactModuleToggle(false);
  const closeCorpModule = () => setCorpModuleToggle(false);

  // const calculateDropdown = () => {
  //   if(toggleRef.current && dropdownRef.current) {
  //     console.log("KOmmer in it")
  //     const toggleRect = toggleRef.current.getBoundingClientRect();
  //     const dropdownRect = dropdownRef.current.getBoundingClientRect();
  //     const tempTopPos = toggleRect.bottom;
  //     const tempRightPos = dropdownRect.right - toggleRect.right;

  //     setTopPos(tempTopPos + 5)
  //     setRightPos(tempRightPos)

  //   }
  // }

  const openDropdown = () => {
    setToggleDropdown(!toggleDropdown)
    // if(toggleDropdown) {
    //   if(toggleRef.current && dropdownRef.current) {
    //     console.log("KOmmer in it")
    //     const toggleRect = toggleRef.current.getBoundingClientRect();
    //     const dropdownRect = dropdownRef.current.getBoundingClientRect();
    //     const tempTopPos = toggleRect.bottom;
    //     const tempRightPos = dropdownRect.right - toggleRect.right;

    //     setTopPos(tempTopPos + 5)
    //     setRightPos(tempRightPos)
    //   }
    // }

    // calculateDropdown()
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
            <div ref={toggleRef}>
              <OutlinedButton
                text='lägg till'
                iconRight={<img src="/arrow-down.svg" alt='Arrow down' />}
                onClick={() => openDropdown()}
              />
            </div>
          {toggleDropdown ?
            <Dropdown toggleRef={toggleRef} onContactClick={() => setContactModuleToggle(!contactModuleToggle)} onCorpClick={() => setCorpModuleToggle(!corpModuleToggle) } />
          : <></>
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

interface IDropdownProps {
  toggleRef: React.RefObject<HTMLDivElement>;
  onContactClick: () => void;
  onCorpClick: () => void;
}

export const Dropdown = ({toggleRef, onContactClick, onCorpClick}: IDropdownProps) => {
  const dropdownRef = React.createRef<HTMLDivElement>();
  const [topPos, setTopPos] = useState<number>(0);
  const [rightPos, setRightPos] = useState<number>(0);

  React.useEffect(() => {
    if(toggleRef.current && dropdownRef.current) {
      const toggleRect = toggleRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const tempTopPos = toggleRect.bottom;
      const tempRightPos = dropdownRect.right - toggleRect.right;

      setTopPos(tempTopPos + 10)
      setRightPos(tempRightPos)
    }
  }, [])

  return (
    <div className={styles.dropdown_container} style={{top: topPos, right: rightPos}} ref={dropdownRef}>
            <Flex direction='column' class={styles.list}>
              <div className={styles.list_container}>
                <p onClick={onContactClick}>Lägg till Kontakt</p>
                <img src='/addContact.svg' alt='Add contact' />
              </div>
              <div className={styles.list_container}>
                <p onClick={onCorpClick}>Lägg till Företag</p>
                <img src='/addCorp.svg' alt='Add compnay' />
              </div>
            </Flex>
          </div>
  )
}

export default kontakter;
