import React, { ReactComponentElement, ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../../styles/Contacts.module.scss';

import AddContactModule from '../components/modules/add_data/AddContactModule';
import AddCorporateModule from '../components/modules/add_data/AddCorporateModule';
import { OutlinedButton } from '../components/ui/buttons/Buttons';
import { Flex } from '../components/ui/Flex';
import { Dropdown } from '../components/shared/dropdown/Dropdown';
import AddEduModule from '../components/modules/add_data/AddEduModule';

interface LayoutProps {
  children: ReactNode;
}

const contactLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const toggleRef = React.createRef<HTMLDivElement>();

  const [contactModuleToggle, setContactModuleToggle] =
    useState<boolean>(false);
  const [corpModuleToggle, setCorpModuleToggle] = useState<boolean>(false);
  const [eduModuleToggle, setEduModuleToggle] = useState<boolean>(false);

  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const closeContactModule = () => setContactModuleToggle(false);
  const closeCorpModule = () => setCorpModuleToggle(false);
  const closeEduModule = () => setEduModuleToggle(false);


  const openDropdown = () => {
    setToggleDropdown(!toggleDropdown);
  };
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
            <li
              className={
                router.pathname === '/kontakter/foretag'
                  ? styles.active_link
                  : ''
              }
            >
              <Link href='/kontakter/foretag'>Företag</Link>
            </li>
            <li
             className={
              router.pathname === '/kontakter/utbildningar'
                ? styles.active_link
                : ''
            }>
              <Link href='/kontakter/utbildningar'>Utbildningar</Link>
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
                iconRight={<img src='/arrow-down.svg' alt='Arrow down' />}
                onClick={() => openDropdown()}
              />
            </div>
            {toggleDropdown ? (
              <Dropdown
                toggleRef={toggleRef}
                onContactClick={() =>
                  setContactModuleToggle(!contactModuleToggle)
                }
                onCorpClick={() => setCorpModuleToggle(!corpModuleToggle)}
                onEduClick={() => setEduModuleToggle(!corpModuleToggle)}

              />
            ) : (
              <></>
            )}
          </Flex>
        </header>
        {children}
      </div>
      <AddContactModule
        active={contactModuleToggle}
        closeModule={closeContactModule}
      />
      <AddCorporateModule
        active={corpModuleToggle}
        closeModule={closeCorpModule}
      />
      <AddEduModule
        active={eduModuleToggle}
        closeModule={closeEduModule}
      />
    </>
  );
};

export default contactLayout;
