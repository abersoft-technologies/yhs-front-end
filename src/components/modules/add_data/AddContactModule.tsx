import React, { useState, useEffect } from 'react';
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
}

const optionsSelect = [
  { value: 'Ny kontakt', label: 'Ny kontakt' },
  { value: 'Möte bokat', label: 'Möte bokat' },
  { value: 'AF skriven', label: 'AF skriven' },
  { value: 'AF Bekräftad', label: 'AF bekräftad' },
  { value: 'Dementerad', label: 'Dementerad' },
];

const AddContactModule = ({ active, closeModule }: IModuleProps) => {
  const [statusProp, setStatusProp] = useState(optionsSelect[0].value);
  const [formData, setFormData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    role: '',
    town: '',
    status: optionsSelect[0].value,
  });
  const { firstName, lastName, email, phoneNumber, company, role, town } =
    formData;

  const [doShowInfoBox, setDoShowInfoBox] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    console.log(name, e.target.value, formData);
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleOnChangeStatus = (label: string, value: string) => {
    setStatusProp(value);
  };
  const addContactFunc = () => {
    addContact(formData);
    setFormData({
      company: '',
      firstName: '',
      lastName: '',
      status: '',
      email: '',
      phoneNumber: '',
      role: '',
      town: '',
    });
    setDoShowInfoBox(true);
    closeModule();
    setTimeout(() => {
      setDoShowInfoBox(false);
    }, 3000);
  };

  /*   const handleOnChangeStatus = (e: React.MouseEvent<HTMLDivElement>) => {
    setStatusProp(e.currentTarget.id);
  }; */

  useEffect(() => {
    setFormData({ ...formData, status: statusProp });
  }, [statusProp]);

  return (
    <>
      <ModuleDarkLayer active={active} />
      <div
        style={
          active
            ? { right: '2%', opacity: '1' }
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
              onChangeFunction={handleOnChangeStatus}
              value={statusProp}
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
