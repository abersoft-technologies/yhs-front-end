import React from 'react';

import styles from './Input.module.scss';

import { Flex } from '../../Flex';

interface IInputProps {
  placeholder: string;
  name: string;
  value: string;
  onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  autoComplete?: boolean;
}

export const Input = ({
  type,
  name,
  placeholder,
  value,
  label,
  onChangeFunction,
  autoComplete,
}: IInputProps) => {
  return (
    <Flex direction='column' gap='small'>
      {label ? (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      ) : (
        ''
      )}
      <input
        id={name}
        type={type ? type : 'text'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChangeFunction}
        className={styles.input}
        autoComplete={autoComplete ? 'on' : 'new-password'}
        aria-multiline='false'
      />
    </Flex>
  );
};
