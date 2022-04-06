import { createRef, useEffect, useState } from 'react';

import styles from '../../../../styles/Contacts.module.scss';

import { Flex } from '../../ui/Flex';

interface IDropdownProps {
  toggleRef: React.RefObject<HTMLDivElement>;
  onContactClick: () => void;
  onCorpClick: () => void;
}

export const Dropdown = ({
  toggleRef,
  onContactClick,
  onCorpClick,
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
          <p onClick={onContactClick}>Lägg till Kontakt</p>
          <img src='/addContact.svg' alt='Add contact' />
        </div>
        <div className={styles.list_container}>
          <p onClick={onCorpClick}>Lägg till Företag</p>
          <img src='/addCorp.svg' alt='Add compnay' />
        </div>
      </Flex>
    </div>
  );
};
