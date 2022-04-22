import React from 'react';

import styles from './Input.module.scss';

interface IInputProps {
  placeholder: string;
  name: string;
  value: string | number;
  onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  autoComplete?: boolean;
  width?: string;
  maxLength?: number;
}

export const Input = ({
  type,
  name,
  placeholder,
  value,
  label,
  onChangeFunction,
  autoComplete,
  width,
  maxLength,
}: IInputProps) => {
  return (
    <div
      className={styles.input_label_container}
      style={width ? { width: width } : { width: 'auto' }}
    >
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
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
        maxLength={maxLength && maxLength}
      />
    </div>
  );
};
