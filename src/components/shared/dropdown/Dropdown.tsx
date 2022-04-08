import { createRef, useEffect, useState } from 'react';

import styles from '../../../../styles/Contacts.module.scss';

import { Flex } from '../../ui/Flex';
import { Text } from '../../ui/text/Text';

interface IDropdownProps {
  toggleRef: React.RefObject<HTMLDivElement>;
  toggleDropdown: () => void;
  onContactClick: () => void;
  onCorpClick: () => void;
  onEduClick: () => void;
}

export const Dropdown = ({
  toggleRef,
  toggleDropdown,
  onContactClick,
  onCorpClick,
  onEduClick,
}: IDropdownProps) => {
  const dropdownRef = createRef<HTMLDivElement>();
  const [topPos, setTopPos] = useState<number>(0);
  const [rightPos, setRightPos] = useState<number>(0);

  useEffect(() => {
    const onClick = (event: any) => {
      // if (!event.target.closest('div')) return;
      // if (event.target.closest('div').id !== 'select-container')
      toggleDropdown();
    };

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    if (toggleRef.current && dropdownRef.current) {
      const toggleRect = toggleRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const tempTopPos = toggleRect.bottom;
      const tempRightPos = dropdownRect.right - toggleRect.right;

      setTopPos(tempTopPos + 10);
      setRightPos(tempRightPos);
    }
  }, []);

  return (
    <div
      className={styles.dropdown_container}
      style={{ top: topPos, right: rightPos }}
      ref={dropdownRef}
    >
      <Flex direction='column' class={styles.list}>
        <div className={styles.list_container} onClick={onContactClick}>
          <img
            src='/svgs/contacts/add_dropdown/add_con.svg'
            alt='Add contact'
          />
          <Text text='Lägg till Kontakt' />
        </div>
        <div className={styles.list_container} onClick={onCorpClick}>
          <img
            src='/svgs/contacts/add_dropdown/add_comp.svg'
            alt='Add company'
          />
          <Text text='Lägg till Företag' />
        </div>
        <div className={styles.list_container} onClick={onEduClick}>
          <img
            src='/svgs/contacts/add_dropdown/add_edu.svg'
            alt='Add education'
          />
          <Text text='Lägg till Utbildning' />
        </div>
      </Flex>
    </div>
  );
};
