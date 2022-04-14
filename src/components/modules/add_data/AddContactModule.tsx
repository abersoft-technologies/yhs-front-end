import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { addContact } from '../../../apis/contact/add';

/* Styles imports */
import styles from './AddContactModule.module.scss';

/* Components imports */
import ModuleDarkLayer from '../ModuleDarkLayer';
import { Input } from '../../ui/form/input/Input';
import { Select } from '../../ui/form/select/Select';
import { Flex } from '../../ui/Flex';
import { FilledButton, OutlinedButton } from '../../ui/buttons/Buttons';
import { Textarea } from '../../ui/form/textarea/Textarea';
import { InfoBox } from '../../ui/info/InfoBox';
import { Text } from '../../ui/text/Text';
import { Checkbox } from '@nextui-org/react';

interface IModuleProps {
  active: boolean;
  closeModule: () => void;
}

interface IFormData {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  company: string;
  role?: string;
  town?: string;
  status: string;
  letterOfIntent: {
    edu: string[];
    employment: string;
    internship: string;
    readEdu: boolean;
    contributeEdu: boolean;
    lecture: boolean;
    studyVisit: boolean;
    eduBoard: boolean;
  };
}

const optionsSelect = [
  { value: 'Ny kontakt', label: 'Ny kontakt' },
  { value: 'Möte bokat', label: 'Möte bokat' },
  { value: 'AF Skriven', label: 'AF Skriven' },
  { value: 'AF Bekräftad', label: 'AF Bekräftad' },
  { value: 'Dementerad', label: 'Dementerad' },
];
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

const AddContactModule = ({ active, closeModule }: IModuleProps) => {
  const eduOptions = useSelector(
    (state: RootState) => state.filterOptionsReducer.result.educations.data
  );
  const [formData, setFormData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    role: '',
    town: '',
    status: optionsSelect[0].value,
    letterOfIntent: {
      edu: [],
      employment: '',
      internship: '',
      readEdu: false,
      contributeEdu: false,
      lecture: false,
      studyVisit: false,
      eduBoard: false,
    },
  });
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    company,
    role,
    town,
    status,
  } = formData;
  const {
    readEdu,
    contributeEdu,
    lecture,
    studyVisit,
    eduBoard,
    edu,
    employment,
    internship,
  } = formData.letterOfIntent;

  const [doShowInfoBox, setDoShowInfoBox] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    console.log(name, e.target.value, formData);
    setFormData({ ...formData, [name]: e.target.value });
  };

  const checkActiveStatus = () => {
    if (
      status === 'AF Skriven' ||
      status === 'AF Bekräftad' ||
      status === 'Dementerad'
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleOnChangeSelect = (label: string, value: string) => {
    switch (label) {
      case 'Status':
        return setFormData({ ...formData, status: value });
      case 'Utbildningar':
        return setFormData({
          ...formData,
          letterOfIntent: {
            ...formData.letterOfIntent,
            edu: [value],
          },
        });
      case 'Anställning':
        return setFormData({
          ...formData,
          letterOfIntent: {
            ...formData.letterOfIntent,
            employment: value,
          },
        });
      case 'LIA':
        return setFormData({
          ...formData,
          letterOfIntent: {
            ...formData.letterOfIntent,
            internship: value,
          },
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
      letterOfIntent: { ...formData.letterOfIntent, [key]: e.target.checked },
    });
  };

  const addContactFunc = () => {
    addContact(formData);
    setFormData({
      company: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: '',
      town: '',
      status: optionsSelect[0].value,
      letterOfIntent: {
        edu: [],
        employment: '',
        internship: '',
        readEdu: false,
        contributeEdu: false,
        lecture: false,
        studyVisit: false,
        eduBoard: false,
      },
    });
    setDoShowInfoBox(true);
    closeModule();
    setTimeout(() => {
      setDoShowInfoBox(false);
    }, 3000);
  };

  return (
    <>
      <ModuleDarkLayer active={active} />
      <div
        style={
          active
            ? { right: '0', opacity: '1' }
            : { right: '-55%', opacity: '0' }
        }
        className={styles.add_contact_module_container}
      >
        <header>
          <Flex direction='row' align='center' justify='center'>
            <h3>Ny kontakt</h3>
            <button onClick={closeModule}>
              <img src='/close-module-icon.svg' alt='Cross' />
            </button>
          </Flex>
        </header>
        <form>
          <Flex
            direction='row'
            gap='xxx-large'
            width='full'
            justify='space-between'
          >
            <Input
              width='50%'
              name='firstName'
              placeholder='Förnamn'
              label='Förnamn'
              value={firstName}
              onChangeFunction={handleOnChange}
            />
            <Input
              width='50%'
              name='lastName'
              placeholder='Efternamn'
              label='Efternamn'
              value={lastName}
              onChangeFunction={handleOnChange}
            />
          </Flex>

          <Flex
            direction='row'
            gap='xxx-large'
            width='full'
            justify='space-between'
          >
            <Input
              width='50%'
              name='email'
              placeholder='Email'
              label='Email'
              type='email'
              value={email ? email : ''}
              onChangeFunction={handleOnChange}
            />
            <Input
              width='50%'
              name='phoneNumber'
              placeholder='Mobilnummer'
              label='Mobilnummer'
              value={phoneNumber ? phoneNumber : ''}
              onChangeFunction={handleOnChange}
            />
          </Flex>
          <Flex
            direction='row'
            gap='xxx-large'
            width='full'
            justify='space-between'
          >
            <Input
              width='50%'
              name='company'
              placeholder='Företag'
              label='Företag'
              value={company}
              onChangeFunction={handleOnChange}
            />
            <Input
              width='50%'
              name='role'
              placeholder='Roll'
              label='Roll'
              value={role ? role : ''}
              onChangeFunction={handleOnChange}
            />
          </Flex>
          <Flex
            direction='row'
            gap='xxx-large'
            width='full'
            justify='space-between'
          >
            <Input
              width='50%'
              name='town'
              placeholder='Ort'
              label='Ort'
              value={town ? town : ''}
              onChangeFunction={handleOnChange}
            />
            <Select
              label='Status'
              options={optionsSelect}
              width='50%'
              onChangeFunction={handleOnChangeSelect}
              value={status}
            />
          </Flex>
          <div className={styles.textarea_container}>
            <Textarea
              name='free-text'
              cols={20}
              rows={5}
              label='Övrig information'
              placeholder='Fri text...'
            />
          </div>

          {checkActiveStatus() && (
            <Flex
              direction='column'
              gap='medium'
              class={styles.af_section_container}
            >
              <Text text='Avsiktsförklaring' color='#464646' />
              <Select
                label='Utbildningar'
                options={eduOptions}
                width='100%'
                onChangeFunction={handleOnChangeSelect}
                value={edu[0]}
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
                  value={employment}
                />
                <Select
                  label='LIA'
                  options={optionsLia}
                  width='50%'
                  onChangeFunction={handleOnChangeSelect}
                  value={internship}
                />
              </Flex>
              <Flex direction='row' gap='x-large' class={styles.checkbox_group}>
                <Text text='Övrig medverkan' color='#464646' />
                <Checkbox
                  checked={readEdu}
                  onChange={(e) => handleOnChangeCheckbox(e, 'readEdu')}
                  size='sm'
                >
                  Insatt i utb.p
                </Checkbox>
                <Checkbox
                  checked={contributeEdu}
                  onChange={(e) => handleOnChangeCheckbox(e, 'contributeEdu')}
                  size='sm'
                >
                  Bidrag till utb.
                </Checkbox>
                <Checkbox
                  checked={lecture}
                  onChange={(e) => handleOnChangeCheckbox(e, 'lecture')}
                  size='sm'
                >
                  Föreläsningar
                </Checkbox>
                <Checkbox
                  checked={studyVisit}
                  onChange={(e) => handleOnChangeCheckbox(e, 'studyVisit')}
                  size='sm'
                >
                  Studiebesök
                </Checkbox>
                <Checkbox
                  checked={eduBoard}
                  onChange={(e) => handleOnChangeCheckbox(e, 'eduBoard')}
                  size='sm'
                >
                  Ledningsgrupp
                </Checkbox>
              </Flex>
            </Flex>
          )}
        </form>
        <section>
          <div>
            <OutlinedButton onClick={closeModule} text='Avbryt' width='100%' />

            <FilledButton
              onClick={() => addContactFunc()}
              text='Lägg till kontakt'
              width='100%'
            />
          </div>
        </section>
      </div>
      <InfoBox
        infoText='Du har lagt till en ny kontakt'
        showBox={doShowInfoBox}
        type='success'
      />
    </>
  );
};

export default AddContactModule;
