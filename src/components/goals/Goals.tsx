/* eslint-disable */

import React, { useState, useEffect, useCallback } from 'react';
import { OutlinedButton } from '../ui/buttons/Buttons';
import { Flex } from '../ui/Flex';
import { Input } from '../ui/form/input/Input';
import { Select } from '../ui/form/select/Select';
import styles from './Goals.module.scss';
import { getAll, getEdu } from '../../apis/edu/get';
import { updateEdu } from '../../apis/edu/update';
import { useAppDispatch } from '../../hooks/useStore';
import { showInfoBox } from '../../store/slice/infoBox';
import { Modal } from '@nextui-org/react';

interface IGoalData {
  letters: number;
  employements: number;
  internships: number;
}

interface IEduObject {
  name: string;
  place: string;
  shortName: string;
  type: string;
  _id: string;
  goal?: {
    letters: Number;
    internships: Number;
    employements: Number;
  };
}

interface IEducation {
  value: string;
  label: string;
}

interface IGoalProps {
  id: string;
  currentGoals?: IGoalData;
}

const Goals = ({ id, currentGoals }: IGoalProps) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [goalData, setGoalData] = useState<IGoalData>({
    letters: 0,
    employements: 0,
    internships: 0,
  });
  const [educations, setEducations] = useState<Array<IEduObject>>([]);
  const [optionList, setOptionList] = useState<
    Array<{ value: string; label: string; id: string }>
  >([]);
  const [education, setEducation] = useState<IEducation>({
    label: '',
    value: '',
  });
  const [show, setShow] = useState<boolean>(true);

  const getAllEdus = async () => {
    await getAll()
      .then((res) => {
        setEducations(res?.data.data.eduList);
      })
      .catch((err) => console.log(err));
  };

  const createOptionList = useCallback(() => {
    const list: Array<{ value: string; label: string; id: string }> = [];

    educations &&
      educations.forEach((item) => {
        const obj = { value: item.name, label: item.name, id: item._id };
        list.push(obj);
      });
    setOptionList(list);
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    setGoalData({ ...goalData, [name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const result = await updateEdu(id, { goal: { ...goalData } });
    if (result?.status === 200) {
      dispatch(
        showInfoBox({
          infoText: 'Du har uppdaterat målen för denna utbildning',
          time: 3000,
          type: 'success',
        })
      );
    }
  };
  const closeHandler = () => {
    setVisible(false);
  };

  const handleOnChangeSelect = (label: string, value: string, _id?: string) => {
    setEducation({ label: label, value: value });
    // setId(_id!)
  };

  const educationLength = educations && educations.length;
  const optionLength = optionList && optionList.length;

  useEffect(() => {
    if (currentGoals) setGoalData(currentGoals);
  }, [currentGoals]);

  useEffect(() => {
    getAllEdus();
    createOptionList();
  }, [educationLength, optionLength, createOptionList]);

  return (
    <>
      <Flex
        direction='column'
        align='flex-start'
        justify='center'
        class={styles.goalCard}
      >
        <Flex direction='row' align='center' justify='space-between'>
          <h1>Utbildningsmål</h1>

          <button onClick={() => setVisible(true)}>edit</button>
        </Flex>
        <form className={styles.selectContainer}>
          {/*        <Input
          type='number'
          name='letters'
          label='Avsiktsförklaringar'
          placeholder='Skriv här...'
          value={goalData.letters}
          onChangeFunction={handleOnChange}
          width='90%'
          />
          <Input
          type='number'
          name='employements'
          label='Anställningar'
          placeholder='Skriv här...'
          value={goalData.employements}
          onChangeFunction={handleOnChange}
          width='90%'
          />
          <Input
          type='number'
          name='internships'
          label='LIA'
          placeholder='Skriv här...'
          value={goalData.internships}
          onChangeFunction={handleOnChange}
          width='90%'
        /> */}
          {/*       <Flex direction='row' align='flex-start' class={styles.buttonContainer}>
          <OutlinedButton
          text='Uppdatera dina mål'
          onClick={(e: any) => onSubmit(e)}
          />
        </Flex> */}
        </form>
      </Flex>
      <Modal
        closeButton
        blur
        aria-labelledby='Sätt utbildningsmål'
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          {/* <h2>Utbildningsmål</h2> */}
          <div>
            <label htmlFor='final-goal'></label>
            <input type='checkbox' name='final-goal' id='final-goal' />
            <label htmlFor='sub-goal'></label>
            <input type='checkbox' name='sub-goal' id='sub-goal' />
          </div>
        </Modal.Header>
        <Modal.Body>
          <h3>Slutmål</h3>
          <h3>Delmål</h3>
          <Flex
            direction='row'
            gap='medium'
            class={styles.input_container_modal}
          >
            <Input
              type='number'
              name='letters'
              label='Avsiktsförklaringar'
              placeholder='Skriv här...'
              value={goalData.letters}
              onChangeFunction={handleOnChange}
              width='45%'
            />
            <Input
              type='number'
              name='employements'
              label='Anställningar'
              placeholder='Skriv här...'
              value={goalData.employements}
              onChangeFunction={handleOnChange}
              width='45%'
            />
            <Input
              type='number'
              name='internships'
              label='LIA'
              placeholder='Skriv här...'
              value={goalData.internships}
              onChangeFunction={handleOnChange}
              width='45%'
            />
          </Flex>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Goals;
