import React from 'react';

import styles from './Barsparamstoggle.module.scss';

import { Flex } from '../../../ui/Flex';

import { ICheckedParams } from '../Barchart';

interface IParamsToggleProps {
  checkedParams: ICheckedParams;
  setCheckedParams: (params: ICheckedParams) => void;
}

const BarsParamsToggle = ({
  checkedParams,
  setCheckedParams,
}: // handleChangeCheckboxParams,
IParamsToggleProps) => {
  const handleChangeCheckboxParams = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setCheckedParams({ ...checkedParams, [e.target.name]: checkedParams[e.target.name] });
    const pressedCheckbox: string = e.target.name;
    let totalSum = 0;

    checkedParams.letter_of_intent ? (totalSum += 1) : totalSum;
    checkedParams.employment ? (totalSum += 1) : totalSum;
    checkedParams.internship ? (totalSum += 1) : totalSum;
    if (totalSum === 1 && e.target.checked === false) return;

    if (pressedCheckbox === 'letter_of_intent') {
      setCheckedParams({
        ...checkedParams,
        [pressedCheckbox]: !checkedParams[pressedCheckbox],
      });
    } else if (pressedCheckbox === 'employment') {
      setCheckedParams({
        ...checkedParams,
        [pressedCheckbox]: !checkedParams[pressedCheckbox],
      });
    } else if (pressedCheckbox === 'internship') {
      setCheckedParams({
        ...checkedParams,
        [pressedCheckbox]: !checkedParams[pressedCheckbox],
      });
    }
  };

  return (
    <Flex
      direction='row'
      align='center'
      class={styles.bar_params_toggle_container}
    >
      <div>
        <label
          htmlFor='letter_of_intent'
          style={
            checkedParams.letter_of_intent
              ? { color: '#ffffff' }
              : { color: '#22376f' }
          }
        >
          AF
        </label>
        <input
          type='checkbox'
          name='letter_of_intent'
          id='letterofintent_checkbox_barchart'
          checked={checkedParams.letter_of_intent}
          onChange={handleChangeCheckboxParams}
          style={
            checkedParams.letter_of_intent
              ? { background: '#7586ce' }
              : { background: 'none' }
          }
        />
      </div>
      <div>
        <label
          htmlFor='employment'
          style={
            checkedParams.employment
              ? { color: '#ffffff' }
              : { color: '#22376f' }
          }
        >
          Anst.
        </label>
        <input
          type='checkbox'
          name='employment'
          id='employment_checkbox_barchart'
          checked={checkedParams.employment}
          onChange={handleChangeCheckboxParams}
          style={
            checkedParams.employment
              ? { background: '#7586ce' }
              : { background: 'none' }
          }
        />
      </div>
      <div>
        <label
          htmlFor='internship'
          style={
            checkedParams.internship
              ? { color: '#ffffff' }
              : { color: '#22376f' }
          }
        >
          LIA
        </label>
        <input
          type='checkbox'
          name='internship'
          id='internship_checkbox_barchart'
          checked={checkedParams.internship}
          onChange={handleChangeCheckboxParams}
          style={
            checkedParams.internship
              ? { background: '#7586ce' }
              : { background: 'none' }
          }
        />
      </div>
    </Flex>
  );
};

export default BarsParamsToggle;
