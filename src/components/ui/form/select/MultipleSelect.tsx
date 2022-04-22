import React, { useEffect, useState } from 'react';
import { Flex } from '../../Flex';

import styles from './Select.module.scss';

interface ISelectProps {
  onChangeFunction: (selectedArray: string[], setValue?: boolean) => void;
  label: string;
  width?: string;
  options: { value: string; label: string; id?: string; tagName?: string }[];
  addAble?: boolean;
  id?: string;
  value?: string[];
}

type selectedArrType = string[];

export const MultipleSelect = ({
  label,
  onChangeFunction,
  options,
  width,
  addAble,
  value,
}: ISelectProps) => {
  const [selectClicked, setSelectClicked] = useState(false);
  const [valAlreadySet, setValAlreadySet] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [selectedArr, setSelectedArr] = useState<selectedArrType>([]);

  const setSelArrAndChangeFunc = (arr: string[], setValue?: boolean) => {
    setSelectedArr(arr);
    if (onChangeFunction) {
      onChangeFunction(arr, setValue);
    }
  };

  useEffect(() => {
    if (value && value.length > 0 && !valAlreadySet) {
      // setSelectedArr(value);
      setSelArrAndChangeFunc(value, true);
      setValAlreadySet(true);
    }
  }, [value]);

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

  /*   useEffect(() => {
    if (onChangeFunction) {
      onChangeFunction(selectedArr);
    }
  }, [selectedArr]); */

  const handleClrTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const innerTxt = e.currentTarget.closest('div')?.innerText;
    if (!innerTxt) return;
    const index = selectedArr.indexOf(innerTxt);

    let resultArr = [...selectedArr];
    resultArr.splice(index, 1);

    // setSelectedArr(resultArr);
    setSelArrAndChangeFunc(resultArr);
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    if (e.target.value.length > 0) {
      setSelectClicked(true);
    }
  };
  const handleKeypressInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    if (e.key === 'Enter' && addAble && inputVal.length > 0) {
      if (selectedArr.length > 0) {
        let result = [...selectedArr, inputVal];
        // setSelectedArr(result);
        setSelArrAndChangeFunc(result);
        setInputVal('');
      } else {
        // setSelectedArr([inputVal]);
        setSelArrAndChangeFunc([inputVal]);
        setInputVal('');
      }
    }
    if (e.key === 'Backspace' && inputVal.length === 0) {
      let newArr = [...selectedArr];
      newArr.pop();
      // setSelectedArr(newArr);
      setSelArrAndChangeFunc(newArr);
    }
  };

  const handleMultiSelect = (value: string) => {
    // setSelectedArr([...selectedArr, value]);
    setSelArrAndChangeFunc([...selectedArr, value]);
  };
  const handleAddOption = () => {
    // setSelectedArr([...selectedArr, inputVal]);
    setSelArrAndChangeFunc([...selectedArr, inputVal]);
    setInputVal('');
  };

  const ClearTag = () => {
    return (
      <button onClick={handleClrTag} className={styles.clr_tag}>
        <svg
          width='10'
          height='10'
          viewBox='0 0 10 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1.66699 8.33332L8.33366 1.66666M1.66699 1.66666L8.33366 8.33332L1.66699 1.66666Z'
            stroke='#22376f'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    );
  };

  const finalOptions = options.filter(
    (item) => !selectedArr.includes(item.value)
  );

  const checkIfNoRes = () => {
    let newArray: string[] = [];
    finalOptions.map((item) => {
      newArray.push(item.label.toLocaleLowerCase());
    });
    const contains = () =>
      newArray.some((txt) => txt.includes(inputVal.toLocaleLowerCase()));

    let result = contains();

    return result;
  };

  const areOptions = checkIfNoRes();

  return (
    <div
      className={styles.select_label_container}
      style={width ? { width: width } : { width: 'auto' }}
    >
      <Flex direction='row' justify='space-between'>
        {label && (
          <label className={styles.label} htmlFor='select-container'>
            {label}
          </label>
        )}
        {selectedArr.length > 0 && (
          <button
            type='button'
            onClick={() => setSelectedArr([])}
            className={styles.clr_btn_multi}
          >
            Clear
          </button>
        )}
      </Flex>
      <div
        className={`${styles.select_container} ${styles.select__mutli_container}`}
        id='select-container'
        onClick={() => setSelectClicked(!selectClicked)}
      >
        {selectedArr.length > 0 &&
          selectedArr.map((item, i) => {
            return (
              <div key={i} className={styles.select_tag}>
                <div>{item}</div>
                <ClearTag />
              </div>
            );
          })}
        <input
          type='search'
          value={inputVal}
          placeholder='Välj...'
          onChange={handleOnChangeInput}
          onKeyDown={handleKeypressInput}
        />

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
          {finalOptions.length > 0 && (
            <>
              {finalOptions.map((item, i) => {
                if (
                  item.value
                    .toLocaleLowerCase()
                    .includes(inputVal.toLocaleLowerCase())
                ) {
                  return (
                    <div
                      key={i}
                      id={item.value}
                      onClick={() => handleMultiSelect(item.value)}
                      className={styles.select_option}
                    >
                      {item.label}
                    </div>
                  );
                }
              })}
            </>
          )}
          {(!areOptions || finalOptions.length === 0) && (
            <Flex
              direction='row'
              justify='center'
              class={styles.select_no_option}
            >
              {addAble && inputVal.length > 0 ? (
                <button
                  className={styles.add_option_btn}
                  onClick={handleAddOption}
                >
                  Lägg till
                </button>
              ) : (
                <div>Inga val</div>
              )}
            </Flex>
          )}
        </div>
      </div>
    </div>
  );
};
