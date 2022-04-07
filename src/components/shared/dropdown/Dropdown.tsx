import { createRef, useEffect, useState } from 'react';

import styles from '../../../../styles/Contacts.module.scss';

import { Flex } from '../../ui/Flex';
import { Text } from '../../ui/text/Text';

interface IDropdownProps {
  toggleRef: React.RefObject<HTMLDivElement>;
  onContactClick: () => void;
  onCorpClick: () => void;
  onEduClick: () => void;
}

export const Dropdown = ({
  toggleRef,
  onContactClick,
  onCorpClick,
  onEduClick
}: IDropdownProps) => {
  const dropdownRef = createRef<HTMLDivElement>();
  const [topPos, setTopPos] = useState<number>(0);
  const [rightPos, setRightPos] = useState<number>(0);

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
        <div className={styles.list_container}>
          <Text text='Lägg till Kontakt' onClick={onContactClick} />
          <img src='/addContact.svg' alt='Add contact' />
        </div>
        <div className={styles.list_container}>
          <Text text='Lägg till Företag' onClick={onCorpClick} />
          <img src='/addCorp.svg' alt='Add company' />
        </div>
        <div className={styles.list_container}>
          <Text text='Lägg till Utbildning' onClick={onEduClick} />
          <img src='/addEducation.svg' alt='Add education' />
        </div>
      </Flex>
    </div>
  );
};
