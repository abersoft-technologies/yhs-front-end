import react, { useEffect, useState } from 'react';
import { Flex } from '../../ui/Flex';
import { Text } from '../../ui/text/Text';
import { getAllLetters } from '../../../apis/letter/get';

import styles from './InfoCards.module.scss';
import { ILetterSchema } from '../../../types/global';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface ICardProps {
  text: string;
  number: string;
  svg: string;
}
interface ItotalData {
  employment: {
    low: number;
    high: number;
  };
  internship: number;
  other: number;
}

export const InfoCards = () => {
  const [letters, setLetters] = useState<Array<ILetterSchema>>([]);
  const [totalData, setTotalData] = useState<ItotalData>({
    employment: {
      low: 0,
      high: 0,
    },
    internship: 0,
    other: 0,
  });
  const lettersData = useSelector(
    (state: RootState) => state.lettersDataReducer.result
  );
  const lettersLength = letters ? letters.length : 0;
  const list = [
    {
      text: 'Avsiktsförklaringar',
      value: lettersLength.toString(),
      svg: '/svgs/overview/cards/document.svg',
    },
    {
      text: 'Anställningar',
      value: totalData.employment.low + '-' + totalData.employment.high,
      svg: '/svgs/overview/cards/employment.svg',
    },
    {
      text: 'LIA Platser',
      value: totalData.internship,
      svg: '/svgs/overview/cards/student.svg',
    },
    {
      text: 'Övrig medverkan',
      value: totalData.other,
      svg: '/svgs/overview/cards/dots.svg',
    },
  ];
  const getData = async () => {
    await getAllLetters()
      .then((res) => {
        const data = res?.data;
        setLetters(data.data);
        console.log('JP data', data.data);
      })
      .catch((err) => console.log(err));
  };

  const calcAllTotalValues = () => {
    let res = {
      employment: {
        low: 0,
        high: 0,
      },
      internship: 0,
      other: 0,
    };

    if (lettersData) {
      lettersData.forEach((item) => {
        res.employment.high += item.totalDataEdu.employment.high;
        res.employment.low += item.totalDataEdu.employment.low;
        res.internship += item.totalDataEdu.internship;
        res.other +=
          item.totalDataEdu.lecture +
          item.totalDataEdu.studyVisit +
          item.totalDataEdu.eduBoard;
      });
    }
    console.log(res);
    return res;
  };

  useEffect(() => {
    const totalData = calcAllTotalValues();
    setTotalData(totalData);
  }, [lettersData]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Flex
      direction='row'
      width='full'
      justify='space-between'
      class={styles.container}
    >
      {list.map((item, i) => {
        return (
          <Card key={i} text={item.text} number={item.value} svg={item.svg} />
        );
      })}
    </Flex>
  );
};

const Card = ({ text, number, svg }: ICardProps) => {
  return (
    <Flex
      direction='row'
      align='center'
      justify='flex-start'
      gap='medium'
      class={styles.card}
    >
      <span>
        <img src={svg} alt='' />
      </span>
      <Flex direction='column'>
        <Text text={text} />
        <Text text={number} />
      </Flex>
    </Flex>
  );
};
