import React, { useState, useEffect } from 'react';
import { getAll } from '../../../apis/edu/get';
import { getAllLetters } from '../../../apis/letter/get';

import styles from './Barchart.module.scss';

/* Mock data imports */
import ColorLabels from '../../../apis/mock/barchart/ColorLabels.json';
import NumbersForBar from '../../../apis/mock/barchart/NumbersForBar.json';

/* Componets imports */
import Bar from './bar/Bar';
import { Flex } from '../../ui/Flex';
import BarsParamsToggle from './bars_params_toggle/BarsParamsToggle';
import { getData } from '../../../apis/contact/letter_of_intent/get';

/* Interfaces */
import { ILetterSchema, IEducationSchema } from "../../../types/global"

interface ILabelColorsProps {
  labelName: string;
  labelColor: string;
}

export interface ICheckedParams {
  letter_of_intent: boolean;
  employment: boolean;
  internship: boolean;
}

interface ITotalDataEdu {
  contributeEdu: number;
  eduBoard: number;
  employment: {low: number, high: number}
  internship: number;
  lecture: number;
  readEdu: number;
  studyVisit: number;
  totalLetters: number;
}

interface IAllData {
  education: IEducationSchema;
  letters: Array<ILetterSchema>;
  totalDataEdu: ITotalDataEdu;
}

const Barchart = () => {
  const [checkedParams, setCheckedParams] = useState<ICheckedParams>({
    letter_of_intent: true,
    employment: true,
    internship: true,
  });
  const [allData, setAllData] = useState<Array<IAllData>>([]);

  const { numbersForBar } = NumbersForBar;
  const { coloredLabels } = ColorLabels;

  const getAllData = async () => {
    const result = await getData();
    setAllData(result?.data.data)
  }

  const calculatePrecent = (current: number, goal: number | undefined): number => {
    if(!current) return 0;
    if(!goal) return (current / 100) * 100;
    if(current >= goal) {
      return 100;
    }
    return (current / goal) * 100;
  }

  useEffect(() => {
    getAllData();
  }, [allData && allData.length]);

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
      {allData && allData.length
        ? allData.map((item, i) => {
            return (
              <Bar
                numbersForBar={numbersForBar}
                labelName={item.education.name}
                af_percent={calculatePrecent(item.totalDataEdu.totalLetters, item.education.goal?.letters)}
                lia_percent={calculatePrecent(item.totalDataEdu.internship, item.education.goal?.internships)}
                employment_percent={calculatePrecent(item.totalDataEdu.employment.low, item.education.goal?.employements)}
                checkedParams={checkedParams}
                afNumber={item.totalDataEdu.totalLetters}
                internNumber={item.totalDataEdu.internship ? item.totalDataEdu.internship : 0 }
                employeeNumberLow={item.totalDataEdu.employment.low !== null ? item.totalDataEdu.employment.low : 0}
                employeeNumberHigh={item.totalDataEdu.employment.high !== null ? item.totalDataEdu.employment.high : 0}

              />
            );
          })
        : null}
    </Flex>
  );
};

export default Barchart;
