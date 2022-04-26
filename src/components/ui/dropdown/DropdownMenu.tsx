import React, { useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import styles from './Dropdown.module.scss';

import { Flex } from '../Flex';
import { Text } from '../text/Text';

interface MenuItem {
  text: string;
  img?: { url: string; alt: string };
  onClick: (() => void) | string;
  id: string;
  type?: 'normal' | 'warning';
}

interface MenuProps {
  listItems: MenuItem[];
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  width: 'small' | 'medium' | 'large';
}

export const DropdownMenu = ({
  listItems,
  id,
  open,
  setOpen,
  width,
}: MenuProps) => {
  const classes = classNames({
    menu: true,
    [`dropdown-menu--width-${width}`]: width,
  });
  console.log(setOpen, open);
  useEffect(() => {
    const onClick = (event: any) => {
      if (
        event.target.closest('button') &&
        event.target.closest('button').id === id
      ) {
        return;
      } else {
        setOpen(false);
      }
    };

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);
  return (
    <Flex
      direction='column'
      class={`${styles.dropdown} ${open && styles.visable} ${classes}`}
    >
      {listItems.map((item, i) => {
        return (
          <>
            {typeof item.onClick === 'string' ? (
              <Link href={item.onClick}>
                <li
                  className={`${styles.list_item} ${
                    item.type === 'warning' && styles.warning_item
                  }`}
                  id={item.id}
                  key={item.id}
                >
                  {item.img && <img src={item.img?.url} alt={item.img?.alt} />}
                  <Text text={item.text} />
                </li>
              </Link>
            ) : (
              <li
                className={`${styles.list_item} ${
                  item.type === 'warning' && styles.warning_item
                }`}
                id={item.id}
                key={item.id}
                onClick={item.onClick}
              >
                {item.img && <img src={item.img?.url} alt={item.img?.alt} />}

                <Text text={item.text} />
              </li>
            )}
            {listItems.length - 1 > i && (
              <li key={i} className={styles.dropdown_divider}></li>
            )}
          </>
        );
      })}
    </Flex>
  );
};
