import React, { useEffect, useState } from 'react';

import styles from './Select.module.scss';

interface ISelectProps {
  value: string;
  onChangeFunction: React.MouseEventHandler<HTMLDivElement>;
  label?: string;
  width?: string;
  options: { value: string; label: string }[];
}

export const Select = ({
  label,
  value,
  onChangeFunction,
  options,
  width
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
        <span>{value}</span>
        <button type='button'>
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
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>

        <div
          style={!selectClicked ? { display: 'none' } : { display: 'block', zIndex: "1000" }}
          className={styles.select_open_container}
        >
          {options.map((item, i) => {
            return (
              <div
                key={i}
                id={item.value}
                onClick={onChangeFunction}
                className={styles.select_option}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
