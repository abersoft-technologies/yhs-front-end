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

interface ILabelColorsProps {
  labelName: string;
  labelColor: string;
}

export interface ICheckedParams {
  letter_of_intent: boolean;
  employment: boolean;
  internship: boolean;
}

interface Education {
  managementList: Array<string>;
  name: string;
  place: string;
  shortName: string;
  type: string;
}

interface Letter {
  edu: [string];
  employment: string;
  internship: string;
  readEdu: boolean;
  contributeEdu: boolean;
  lecture: boolean;
  studyVisit: boolean;
  eduBoard: boolean;
}

interface ListItem {
  education: Education;
  allLetters: Array<Letter>;
  letterNumber: Array<ILetterLength>;
}

interface ILetterLength {
  number: number;
  lastItem: boolean;
  isSmall: boolean;
}

const Barchart = () => {
  const [checkedParams, setCheckedParams] = useState<ICheckedParams>({
    letter_of_intent: true,
    employment: true,
    internship: true,
  });
  const [eduList, setEduList] = useState<Array<Education>>([]);
  const [letterList, setLetterList] = useState<Array<Letter>>([]);

  const [list, setList] = useState<Array<ListItem>>([]);

  const { numbersForBar } = NumbersForBar;
  const { coloredLabels } = ColorLabels;

  const getAllEducations = async () => {
    await getAll()
      .then((res: any) => {
        console.log(res?.data);
        setEduList(res?.data.data.eduList);
      })
      .catch((err: any) => console.log(err));
  };

  const getLetters = async () => {
    await getAllLetters()
      .then((res) => {
        console.log(res?.data);
        setLetterList(res?.data.data);
      })
      .catch((err) => console.log(err));
  };

  const buildList = () => {
    let letters: Letter[] = [];
    let tempList: Array<ListItem> = [];
    let obj: ListItem = {
      education: {
        managementList: [],
        name: '',
        place: '',
        shortName: '',
        type: '',
      },
      allLetters: [],
      letterNumber: [{ isSmall: false, lastItem: false, number: 0 }],
    };
    eduList &&
      eduList.forEach((item) => {
        letters = letterList.filter((letter) => letter.edu[0] === item.name);
        const list = [];
        list.push({ number: letters.length, isSmall: false, lastItem: false });
        obj = {
          education: item,
          allLetters: letters,
          letterNumber: list,
        };
        tempList.push(obj);
      });
    // console.log(tempList);
    console.log(tempList);
    setList(tempList);
  };

  useEffect(() => {
    getAllEducations();
    getLetters();
    buildList();
  }, [
    eduList && eduList.length,
    letterList && letterList.length,
    list && list.length,
  ]);

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
      {list.length
        ? list.map((item, i) => {
            return (
              <Bar
                numbersForBar={numbersForBar}
                labelName={item.education.name}
                af_percent={item.allLetters.length * 4}
                lia_percent={45}
                employment_percent={80}
                checkedParams={checkedParams}
                afNumber={item.allLetters.length}
              />
            );
          })
        : null}
    </Flex>
  );
};

export default Barchart;
