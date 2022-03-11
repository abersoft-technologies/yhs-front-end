import React, { useState } from 'react';

import styles from './Barchart.module.scss';

/* Mock data imports */
import ColorLabels from '../../../apis/mock/barchart/ColorLabels.json';
import NumbersForBar from '../../../apis/mock/barchart/NumbersForBar.json';

/* Componets imports */
import Bar from './bar/Bar';
import { Flex } from '../../ui/Flex';
import BarsParamsToggle from './bars_params_toggle/BarsParamsToggle';

interface ILabelColorsProps {
  labelName: string;
  labelColor: string;
}

export interface ICheckedParams {
  letter_of_intent: boolean;
  employment: boolean;
  internship: boolean;
}

const Barchart = () => {
  const [checkedParams, setCheckedParams] = useState<ICheckedParams>({
    letter_of_intent: true,
    employment: true,
    internship: true,
  });

  const { numbersForBar } = NumbersForBar;
  const { coloredLabels } = ColorLabels;

  const LabelWithColors = ({ labelName, labelColor }: ILabelColorsProps) => (
    <Flex
      direction='row'
      align='center'
      gap='small'
      class={styles.label_colors_container}
    >
      <div
        style={{
          background: `${labelColor}`,
          border: `1px solid ${labelColor}`,
        }}
      ></div>
      {labelName}
    </Flex>
  );

  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      class={styles.barchart_container}
    >
      <div>
        <button className={styles.button_filter_charts}>
          Mina utbildningar
          <img src='/chevron-down.svg' alt='Chevron down' />
        </button>
      </div>
      <Flex direction='column' class={styles.colored_labels_and_button_group}>
        <Flex direction='row' justify='space-between'>
          <Flex
            direction='row'
            gap='large'
            class={styles.labels_group_container}
          >
            {coloredLabels.map((item: ILabelColorsProps, i: number) => {
              return (
                <LabelWithColors
                  key={i}
                  labelName={item.labelName}
                  labelColor={item.labelColor}
                />
              );
            })}
          </Flex>
          <BarsParamsToggle
            checkedParams={checkedParams}
            setCheckedParams={setCheckedParams}
          />
        </Flex>
      </Flex>
      <Bar
        numbersForBar={numbersForBar}
        labelName={'Front-end Developer'}
        af_percent={20}
        lia_percent={45}
        employment_percent={80}
        checkedParams={checkedParams}
      />
      <Bar
        numbersForBar={numbersForBar}
        labelName={'FE Developer'}
        af_percent={20}
        lia_percent={45}
        employment_percent={80}
        checkedParams={checkedParams}
      />
      <Bar
        numbersForBar={numbersForBar}
        labelName={'Lönekonsult'}
        af_percent={44}
        lia_percent={45}
        employment_percent={80}
        checkedParams={checkedParams}
      />
    </Flex>
  );
};

export default Barchart;
