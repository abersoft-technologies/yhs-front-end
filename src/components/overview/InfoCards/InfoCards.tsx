import react, { useCallback, useEffect, useState } from 'react';
import { Flex } from '../../ui/Flex';
import { Text } from '../../ui/text/Text';
import { getAllLetters } from '../../../apis/letter/get';
import { getNewContacts } from '../../../apis/contact/get';
import { useRouter } from 'next/router';

import styles from './InfoCards.module.scss';
import { ILetterSchema, IContactSchema } from '../../../types/global';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { setFilterQuery } from '../../../store/slice/filterQuery';
import Link from 'next/link';

interface ICardProps {
  text: string;
  number: string;
  svg: string;
  onClickFunc?: () => void;
}
interface ItotalData {
  employment: {
    low: number;
    high: number;
  };
  internship: number;
  other: number;
}

interface INewContacts {
  data: {
    data: Array<IContactSchema>
    count: number;
  }

}

interface IFilterObject {
  filterStatus: string;
  filterTown: string;
  filterEdu: string;
  filterBranchEdu: string,
  filterBranchCorp: string,
  filterType: string,
  filterTags: string[],
}

export const InfoCards = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [letters, setLetters] = useState<Array<ILetterSchema>>([]);
  const [newContacts, setNewContacts] = useState<INewContacts>({data: {count: 0, data: [{_id: "",company: "", firstName: "",lastName: "",letterOfIntent: undefined, letters: undefined, status: ""}]}});

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
  const onClickNewContacts = () => {
    const filterObj: IFilterObject = {
      filterStatus: "Ny kontakt",
      filterTown: "",
      filterEdu: "",
      filterBranchCorp: "",
      filterBranchEdu: "",
      filterTags: [""],
      filterType: "",
  };
    dispatch(setFilterQuery({filterObj: {...filterObj}}));
    localStorage.setItem("filterObjc", JSON.stringify(filterObj))
    sessionStorage.setItem("currentTab", "/kontakter")

    router.push("/kontakter")
  }
  const lettersLength = lettersData[0].letters.length;
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
      value: totalData.internship.toString(),
      svg: '/svgs/overview/cards/student.svg',
    },
    {
      text: 'Nya kontakter',
      value: newContacts?.data.count.toString(),
      svg: '/svgs/overview/cards/newContacts.svg',
      urlPath: "/kontakter",
      onClickFunc: onClickNewContacts,
    },
    {
      text: 'Övrig medverkan',
      value: totalData.other.toString(),
      svg: '/svgs/overview/cards/dots.svg',
    },
  ];
  const getData = async () => {
    await getAllLetters()
      .then((res) => {
        const data = res?.data;
        setLetters(data.data);
      })
      .catch((err) => {
        return err;
      });
  };

  const getNewContactsData = useCallback( async () => {
    await getNewContacts().then(res => {
      const data = res?.data;
      setNewContacts(data)
    }).catch((err) => {
      return err;
    });
  }, [])



  const calcAllTotalValues = useCallback(() => {
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
      setLetters
    }
    return res;
  }, [lettersData]);

  useEffect(() => {
    const totalData = calcAllTotalValues();
    setTotalData(totalData);
    getData();
    getNewContactsData();
  }, [lettersData, letters.length, calcAllTotalValues, getNewContactsData]);

  return (
    <Flex
      direction='row'
      width='full'
      justify='space-between'
      class={styles.container}
      wrap={"wrap"}
      gap={"medium"}
    >
      {list.map((item, i) => {
        return (
          <Card key={i} text={item.text} number={item.value} svg={item.svg} onClickFunc={item.onClickFunc} />
        );
      })}
    </Flex>
  );
};

const Card = ({ text, number, svg, onClickFunc }: ICardProps) => {
  return (
    <Flex
      direction='row'
      align='center'
      justify='flex-start'
      gap='medium'
      class={styles.card}
      onClickFunc={onClickFunc}
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
