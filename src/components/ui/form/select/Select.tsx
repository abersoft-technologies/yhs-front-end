import React, { useEffect, useState } from 'react';
import { Flex } from '../../Flex';

import styles from './Select.module.scss';

interface ISelectProps {
  value: string;
  onChangeFunction: (label: string, value: string, id?: string) => void;
  clearFieldFunc?: (label: string) => void;
  label: string;
  width?: string;
  options: { value: string; label: string; id?: string }[];
  clrAble?: boolean;
  id?: string;
}

export const Select = ({
  label,
  value,
  onChangeFunction,
  clearFieldFunc,
  options,
  width,
  clrAble,
  id,
}: ISelectProps) => {
  const [selectClicked, setSelectClicked] = useState(false);

  useEffect(() => {
    const onClick = (event: any) => {
      if (!event.target.closest('div')) return;
      if (event.target.closest('div').id !== 'select-container')
        setSelectClicked(false);
    };

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);
  const handleClrSelect = () => {
    if (clearFieldFunc) {
      clearFieldFunc(label);
    }
  };

  const ClearSelectField = () => {
    return (
      <button onClick={handleClrSelect} className={styles.clr_btn}>
        <svg
          width='10'
          height='10'
          viewBox='0 0 10 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1.66699 8.33332L8.33366 1.66666M1.66699 1.66666L8.33366 8.33332L1.66699 1.66666Z'
            stroke='#C4C4C4'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    );
  };

  return (
    <div
      className={styles.select_label_container}
      style={width ? { width: width } : { width: 'auto' }}
    >
      {label && (
        <label className={styles.label} htmlFor='select-container'>
          {label}
        </label>
      )}

      <div
        className={styles.select_container}
        id='select-container'
        onClick={() => setSelectClicked(!selectClicked)}
      >
        <span>{value ? value : `Välj ${label.toLocaleLowerCase()}...`}</span>
        {value && clrAble && <ClearSelectField />}

        <button type='button' className={styles.drop_dowm_btn}>
          <span></span>
          <svg
            width='12'
            height='7'
            viewBox='0 0 12 7'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 1L5.78125 6.0625L10.5625 1'
              stroke='#C4C4C4'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <div
          style={
            !selectClicked
              ? { display: 'none' }
              : { display: 'block', zIndex: '1000' }
          }
          className={styles.select_open_container}
        >
          {options.map((item, i) => {
            return (
              <div
                key={i}
                id={item.value}
                onClick={() => onChangeFunction(label, item.value, item.id)}
                className={styles.select_option}
              >
                {item.label}
              </div>
            );
          })}
          {!options ||
            (options.length === 0 && (
              <Flex
                direction='row'
                justify='center'
                class={styles.select_no_option}
              >
                <div>Inga val</div>
              </Flex>
            ))}
        </div>
      </div>
    </div>
  );
};
