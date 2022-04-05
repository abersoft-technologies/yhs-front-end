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
  value?: string,
  onChangeFunc?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  width?: "auto" | "screen" | "full";
}

export const Textarea = ({
  name,
  label,
  cols,
  rows,
  placeholder,
  value,
  onChangeFunc,
  width,
}: ITextareaProps) => {
  return (
    <Flex direction='column' gap='small' width={width}>
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
        onChange={(e) => onChangeFunc ? onChangeFunc(e) : null}
        placeholder={placeholder}
        style={{ resize: 'none' }}
        value={value}
      ></textarea>
    </Flex>
  );
};
