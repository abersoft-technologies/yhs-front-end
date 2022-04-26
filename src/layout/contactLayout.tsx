import React, {
  ReactComponentElement,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { removeQuery, setQuery } from '../store/slice/searchQuery';
import { useSearchDebounce } from '../hooks/useSearchDebounce';

import styles from '../../styles/Contacts.module.scss';

import AddContactModule from '../components/modules/add_data/AddContactModule';
import AddCorporateModule from '../components/modules/add_data/AddCorporateModule';
import { OutlinedButton } from '../components/ui/buttons/Buttons';
import { Flex } from '../components/ui/Flex';
import { Dropdown } from '../components/shared/dropdown/Dropdown';
import AddEduModule from '../components/modules/add_data/AddEduModule';
import { SearchBar } from '../components/shared/searchbar/Searchbar';
import FilterInterface from '../components/filter_interface/FilterInterface';
import { getAll } from '../apis/contact/getAll';
import { InfoBox } from '../components/ui/info/InfoBox';
import { route } from 'next/dist/server/router';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface LayoutProps {
  children: ReactNode;
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

interface IInfoBoxProps {
  infoText: string;
  type: 'warning' | 'info' | 'tip' | 'success';
  showBox: boolean;
  time: number;
}

const contactLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState('');

  const toggleRef = React.createRef<HTMLDivElement>();

  const [filterIsActive, setFilterIsActive] = useState<boolean>(false);
  const [contactModuleToggle, setContactModuleToggle] =
    useState<boolean>(false);
  const [corpModuleToggle, setCorpModuleToggle] = useState<boolean>(false);
  const [eduModuleToggle, setEduModuleToggle] = useState<boolean>(false);

  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const [managementList, setManagementList] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [ListData, setListData] = useState<Array<IContactData>>([]);

  const closeContactModule = () => setContactModuleToggle(false);
  const closeCorpModule = () => setCorpModuleToggle(false);
  const closeEduModule = () => setEduModuleToggle(false);

  const openDropdown = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const createContactList = (data: Array<IContactData>) => {
    const list: Array<{ value: string; label: string }> = [];
    data.forEach((item: IContactData, i: number) => {
      let text = '';
      text += item.firstName + ' ' + item.lastName;
      const obj = {
        value: text,
        label: text,
        id: item._id,
      };
      list.push(obj);
    });
    setManagementList(list);
  };

  useEffect(() => {
    const handleQuerySearch = () => {
      dispatch(setQuery(searchWord));
    };
    const timeOutId = setTimeout(() => handleQuerySearch(), 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [searchWord]);

  useEffect(() => {
    const currentTab = useLocalStorage("get", "session", "currentTab")
    if(currentTab) router.push(currentTab)
    getAll()
      .then((res) => {
        console.log('RES --->', res?.data);
        setListData(res?.data.data.contactList);
        createContactList(res?.data.data.contactList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    useLocalStorage("set", "session", "currentTab", router.pathname)
    dispatch(setQuery(""));
    setSearchWord("")
  }, [router.pathname])

  const setSearchPlaceholder = () => {
    switch (router.pathname) {
      case '/kontakter':
        return 'Sök bland kontakter...';
      case '/kontakter/foretag':
        return 'Sök bland företag...';
      case '/kontakter/utbildningar':
        return 'Sök bland utbildningar...';
      default:
        return '';
    }
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
              }
            >
              <Link href='/kontakter/utbildningar'>Utbildningar</Link>
            </li>
          </ul>
        </nav>
        <header className={styles.contact_header}>
          <Flex direction='row' justify='space-between'>
            <div className={styles.contact_layout_search_n_filter_container}>
              <SearchBar
                searchWord={searchWord}
                setSearchWord={setSearchWord}
                width='420px'
                placeholder={setSearchPlaceholder()}
              />
              <button onClick={() => setFilterIsActive(!filterIsActive)}>
                <img src='/filter-icon.svg' alt='Filter icon' /> Filter
              </button>
            </div>
            <Flex
              direction='column'
              gap='large'
              align='center'
              justify='center'
            >
              <div ref={toggleRef}>
                <button
                  className={styles.add_btn}
                  onClick={() => openDropdown()}
                >
                  Lägg till
                  <img src='/arrow-down.svg' alt='Arrow down' />
                </button>
              </div>
              {toggleDropdown ? (
                <Dropdown
                  toggleDropdown={openDropdown}
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
          </Flex>
          <FilterInterface isActive={filterIsActive} />
        </header>
        <div
          className={`${styles.label_bar_container} ${
            router.pathname === '/kontakter/utbildningar' &&
            styles.label_bar_container_edu
          } ${ router.pathname === '/kontakter/foretag' &&
          styles.label_bar_container_corp}`}
        >
          {router.pathname === '/kontakter/foretag' && (
            <>
              <div>Namn</div>
              <div>Taggar</div>
              <div>Branch</div>
              <div>Övrig info</div>
            </>
          )}
          {router.pathname === '/kontakter' && (
            <>
              <div>Namn</div>
              <div>
                <div>Företag</div>
                <div>Roll</div>
              </div>
              <div>Ort</div>
              <div>Status</div>
              <div>Kontaktinfo.</div>
            </>
          )}
          {router.pathname === '/kontakter/utbildningar' && (
            <>
              <div>Namn</div>
              <div>Förkortning</div>
              <div>typ</div>
              <div>Ledningsgrupp</div>
              <div>Branch</div>
              <div>Ort</div>
            </>
          )}
        </div>
      </div>
      <div className={styles.children_container}>{children}</div>
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
        contactList={managementList}
        listDataContacts={ListData}
      />
    </>
  );
};

export default contactLayout;
