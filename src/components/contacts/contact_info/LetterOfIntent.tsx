import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { updateLetOfIntent } from '../../../apis/contact/letter_of_intent/update';
import { getLetter } from '../../../apis/contact/letter_of_intent/get';
import { addLetter } from '../../../apis/contact/add';
import { useRouter } from 'next/router';

/* Import Styling */
import styles from './ContactInfo.module.scss';

/* Import interfaces */
import { ILetterSchema } from '../../../types/global';

/* Import components */
import { Text } from '../../ui/text/Text';
import { Flex } from '../../ui/Flex';
import { Select } from '../../ui/form/select/Select';
import { Checkbox, Tooltip } from '@nextui-org/react';
import { MultipleSelect } from '../../ui/form/select/MultipleSelect';
import { updateContact } from '../../../apis/contact/update';

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

const LetterOfIntent = () => {
  const router = useRouter();
  const contact = useSelector(
    (state: RootState) => state.contactReducer.result
  );
  const eduOptions = useSelector(
    (state: RootState) => state.filterOptionsReducer.result.educations.data
  );

  const [edited, setEdited] = useState(false);

  const [formData, setFormData] = useState<ILetterSchema>({
    edu: [],
    employment: '',
    internship: '',
    readEdu: false,
    contributeEdu: false,
    lecture: false,
    studyVisit: false,
    eduBoard: false,
  });

  const handleGetLetter = async (id: any) => {
    const res = await getLetter(id);
    if (res?.data) {
      setFormData(res.data.data);
    }
    return res;
  };

  useEffect(() => {
    const { id } = router.query;
    if (id !== contact._id || !contact.letters) return;

    if (contact?.letters[0]) {
      handleGetLetter(contact?.letters[0]);
    }
  }, [contact]);

  const handleUpdateLetOfIntent = async () => {
    if (!contact.letters || contact.letters.length < 1) {
      const res = await addLetter(formData);
      if (res?.status === 200) {
        let _id = res.data.data._id;
        await updateContact(contact._id, { letters: [{ _id }] });
        handleGetLetter(contact._id);
      }

      return;
    }

    const id = contact?.letters[0];

    const result = await updateLetOfIntent(id, formData);
    if (result?.status === 200) {
      setEdited(false);
    }
  };

  const handleOnChangeSelect = (label: string, value: string) => {
    if (!edited) setEdited(true);
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

  const handleSetEdu = (tagArray: string[]) => {
    if (!edited) setEdited(true);
    setFormData((prev) => ({ ...prev, edu: tagArray }));
  };
  const handleOnChangeCheckbox = (e: any, key: string) => {
    if (!edited) setEdited(true);
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
          <Flex direction='row' justify='space-between'>
            <Text text='Avsiktsförklaring' textSize='large' color='#464646' />
            {edited && (
              <button
                type='button'
                className={styles.af_update_btn}
                onClick={handleUpdateLetOfIntent}
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4.52988 13.2188C4.56504 13.2188 4.6002 13.2152 4.63535 13.21L7.59199 12.6914C7.62715 12.6844 7.66055 12.6686 7.68516 12.6422L15.1365 5.19082C15.1528 5.17456 15.1657 5.15524 15.1746 5.13398C15.1834 5.11271 15.1879 5.08992 15.1879 5.06689C15.1879 5.04387 15.1834 5.02108 15.1746 4.99981C15.1657 4.97855 15.1528 4.95923 15.1365 4.94297L12.215 2.01973C12.1816 1.98633 12.1377 1.96875 12.0902 1.96875C12.0428 1.96875 11.9988 1.98633 11.9654 2.01973L4.51406 9.47109C4.4877 9.49746 4.47188 9.5291 4.46484 9.56426L3.94629 12.5209C3.92919 12.6151 3.9353 12.712 3.96409 12.8033C3.99288 12.8945 4.04349 12.9774 4.11152 13.0447C4.22754 13.1572 4.37344 13.2188 4.52988 13.2188V13.2188ZM5.71465 10.1531L12.0902 3.7793L13.3787 5.06777L7.00312 11.4416L5.44043 11.7176L5.71465 10.1531V10.1531ZM15.4688 14.6953H2.53125C2.22012 14.6953 1.96875 14.9467 1.96875 15.2578V15.8906C1.96875 15.968 2.03203 16.0312 2.10938 16.0312H15.8906C15.968 16.0312 16.0312 15.968 16.0312 15.8906V15.2578C16.0312 14.9467 15.7799 14.6953 15.4688 14.6953Z'
                    fill='#464646'
                  />
                </svg>
                Uppdatera
              </button>
            )}
          </Flex>
          <MultipleSelect
            label='Utbildningar'
            options={eduOptions}
            width='100%'
            onChangeFunction={handleSetEdu}
            value={formData?.edu}
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
              value={formData?.employment}
            />
            <Select
              label='LIA'
              options={optionsLia}
              width='50%'
              onChangeFunction={handleOnChangeSelect}
              value={formData?.internship}
            />
          </Flex>
          <Flex direction='row' gap='xx-large' class={styles.checkbox_group}>
            <Text text='Annan medverkan' color='#464646' />
            <Tooltip content='Insatt i utbildningsplanen'>
              <Checkbox
                checked={formData?.readEdu}
                onChange={(e) => handleOnChangeCheckbox(e, 'readEdu')}
                size='sm'
              >
                Insatt i utb.p
              </Checkbox>
            </Tooltip>
            <Tooltip content='Bidragit till utbildningsplanen'>
              <Checkbox
                checked={formData?.contributeEdu}
                onChange={(e) => handleOnChangeCheckbox(e, 'contributeEdu')}
                size='sm'
              >
                Bidrag till utb.
              </Checkbox>
            </Tooltip>

            <Checkbox
              checked={formData?.lecture}
              onChange={(e) => handleOnChangeCheckbox(e, 'lecture')}
              size='sm'
            >
              Föreläsningar
            </Checkbox>
            <Checkbox
              checked={formData?.studyVisit}
              onChange={(e) => handleOnChangeCheckbox(e, 'studyVisit')}
              size='sm'
            >
              Studiebesök
            </Checkbox>
            <Checkbox
              checked={formData?.eduBoard}
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
