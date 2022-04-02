import React, { useState } from 'react';

import styles from './AddContactModule.module.scss';

import ModuleDarkLayer from '../ModuleDarkLayer';
import { Input } from '../../ui/form/input/Input';
import { Flex } from '../../ui/Flex';
import { FilledButton, OutlinedButton } from '../../ui/buttons/Buttons';
import { Textarea } from '../../ui/form/textarea/Textarea';

interface IModuleProps {
  active: boolean;
  closeModule: () => void;
}

interface IFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  company: string;
  role: string;
  town: string;
  status: string;
}

const AddContactModule = ({ active, closeModule }: IModuleProps) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    company: '',
    role: '',
    town: '',
    status: '',
  });
  const {
    first_name,
    last_name,
    email,
    phone_number,
    company,
    role,
    town,
    status,
  } = formData;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    console.log(name, e.target.value, formData);
    setFormData({ ...formData, [name]: e.target.value });
  };

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
              name='first_name'
              placeholder='Förnamn'
              label='Förnamn'
              value={first_name}
              onChangeFunction={handleOnChange}
            />
            <Input
              width='50%'
              name='last_name'
              placeholder='Efternamn'
              label='Efternamn'
              value={last_name}
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
              value={email}
              onChangeFunction={handleOnChange}
            />
            <Input
              width='50%'
              name='phone_number'
              placeholder='Mobilnummer'
              label='Mobilnummer'
              value={phone_number}
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
              value={role}
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
              value={town}
              onChangeFunction={handleOnChange}
            />
            <Input
              width='50%'
              name='status'
              placeholder='Status'
              label='Status'
              value={status}
              onChangeFunction={handleOnChange}
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
            <FilledButton text='Lägg till kontakt' width='100%' />
          </div>
        </section>
      </div>
    </>
  );
};

export default AddContactModule;
