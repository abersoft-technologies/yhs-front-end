import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

/* Import Styling */
import styles from './ContactInfo.module.scss';

/* Import components */
import { Text } from '../../ui/text/Text';
import { Flex } from '../../ui/Flex';
import { Select } from '../../ui/form/select/Select';
import { Checkbox, Tooltip } from '@nextui-org/react';
import { getContact } from '../../../apis/contact/get';
import { useRouter } from 'next/router';

const optionsAnställning = [
  { value: '0', label: '0' },
  { value: '1-2', label: '1-2' },
  { value: '3-5', label: '3-5' },
  { value: '11-20', label: '11-20' },
  { value: 'Annat', label: 'Annat' },
];
const optionsLia = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: 'Annat', label: 'Annat' },
];

interface IFormData {
  edu: string[];
  employment: string;
  internship: string;
  readEdu: boolean;
  contributeEdu: boolean;
  lecture: boolean;
  studyVisit: boolean;
  eduBoard: boolean;
}

const LetterOfIntent = () => {
  const eduOptions = useSelector(
    (state: RootState) => state.filterOptionsReducer.result.educations.data
  );
  const letOfInt = useSelector(
    (state: RootState) => state.contactReducer.result.letterOfIntent
  );
  const [formData, setFormData] = useState<IFormData>({
    edu: [],
    employment: '',
    internship: '',
    readEdu: false,
    contributeEdu: false,
    lecture: false,
    studyVisit: false,
    eduBoard: false,
  });

  const handleOnChangeSelect = (label: string, value: string) => {
    switch (label) {
      case 'Utbildningar':
        return setFormData({
          ...formData,
          edu: [value],
        });
      case 'Anställning':
        return setFormData({
          ...formData,
          employment: value,
        });
      case 'LIA':
        return setFormData({
          ...formData,
          internship: value,
        });
      default:
        return setFormData({
          ...formData,
        });
    }
  };

  const handleOnChangeCheckbox = (e: any, key: string) => {
    setFormData({
      ...formData,
      [key]: e.target.checked,
    });
  };

  return (
    <div className={styles.letter_of_intent_container}>
      <form>
        <Flex
          direction='column'
          gap='xx-large'
          class={styles.af_section_container}
        >
          <Text text='Avsiktsförklaring' textSize='large' color='#464646' />
          <Select
            label='Utbildningar'
            options={eduOptions}
            width='100%'
            onChangeFunction={handleOnChangeSelect}
            value={letOfInt.edu[0]}
          />
          <Flex
            direction='row'
            gap='xxx-large'
            width='full'
            justify='space-between'
          >
            <Select
              label='Anställning'
              options={optionsAnställning}
              width='50%'
              onChangeFunction={handleOnChangeSelect}
              value={letOfInt.employment}
            />
            <Select
              label='LIA'
              options={optionsLia}
              width='50%'
              onChangeFunction={handleOnChangeSelect}
              value={letOfInt.internship}
            />
          </Flex>
          <Flex direction='row' gap='xx-large' class={styles.checkbox_group}>
            <Text text='Annan medverkan' color='#464646' />
            <Tooltip content='Insatt i utbildningsplanen'>
              <Checkbox
                checked={letOfInt.readEdu}
                onChange={(e) => handleOnChangeCheckbox(e, 'readEdu')}
                size='sm'
              >
                Insatt i utb.p
              </Checkbox>
            </Tooltip>
            <Tooltip content='Bidragit till utbildningsplanen'>
              <Checkbox
                checked={letOfInt.contributeEdu}
                onChange={(e) => handleOnChangeCheckbox(e, 'contributeEdu')}
                size='sm'
              >
                Bidrag till utb.
              </Checkbox>
            </Tooltip>

            <Checkbox
              checked={letOfInt.lecture}
              onChange={(e) => handleOnChangeCheckbox(e, 'lecture')}
              size='sm'
            >
              Föreläsningar
            </Checkbox>
            <Checkbox
              checked={letOfInt.studyVisit}
              onChange={(e) => handleOnChangeCheckbox(e, 'studyVisit')}
              size='sm'
            >
              Studiebesök
            </Checkbox>
            <Checkbox
              checked={letOfInt.eduBoard}
              onChange={(e) => handleOnChangeCheckbox(e, 'eduBoard')}
              size='sm'
            >
              Ledningsgrupp
            </Checkbox>
          </Flex>
        </Flex>
      </form>
    </div>
  );
};

export default LetterOfIntent;
