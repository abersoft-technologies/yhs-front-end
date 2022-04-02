import React from 'react';

/* Styles imports */
import styles from './Textarea.module.scss';

/* Components imports */
import { Flex } from '../../Flex';

interface ITextareaProps {
  name: string;
  cols: number;
  rows: number;
  placeholder: string;
  label?: string;
}

export const Textarea = ({
  name,
  label,
  cols,
  rows,
  placeholder,
}: ITextareaProps) => {
  return (
    <Flex direction='column' gap='small' width='auto'>
      {label ? (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      ) : (
        ''
      )}
      <textarea
        className={styles.textarea}
        name={name}
        id={name}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        style={{ resize: 'none' }}
      ></textarea>
    </Flex>
  );
};
