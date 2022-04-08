import React, { useState } from 'react';
import { FilledButton, OutlinedButton } from '../../ui/buttons/Buttons';
import { Flex } from '../../ui/Flex';
import { Input } from '../../ui/form/input/Input';
import { Textarea } from '../../ui/form/textarea/Textarea';
import ModuleDarkLayer from '../ModuleDarkLayer';
import styles from './AddEduModule.module.scss';
import { addCorp } from '../../../apis/corp/add';
import { Select } from '../../ui/form/select/Select';
import { addEdu } from '../../../apis/edu/add';

interface IModuleProps {
  active: boolean;
  closeModule: () => void;
}

interface IAddEduForm {
  name: string;
  place: string[];
}

const AddEduModule = ({ active, closeModule }: IModuleProps) => {
  const [formData, setFormData] = useState<IAddEduForm>({
    name: '',
    place: [],
  });
  const [tag, setTag] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>('');
  const placeList = [
    { value: 'Uppsala', label: 'Uppsala' },
    { value: 'Stockholm', label: 'Stockholm' },
    { value: 'Allingsås', label: 'Allingsås' },
  ];

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let name = e.target.name;
    console.log(name, e.target.value, formData);
    setFormData({ ...formData, [name]: e.target.value });
    if (e.target.name === 'tag') {
      setTag(e.target.value);
    }
  };

  const handleSelectChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let text: string = '';
    // setSelectValue(e.currentTarget.id)
    const list = formData.place;
    list.push(e.currentTarget.id);
    setFormData((prev) => ({ ...prev, place: list }));
    list.forEach((item) => {
      return (text += item += ', ');
    });
    setSelectValue(text);
  };

  const onClose = () => {
    setFormData({ name: '', place: [] });
    setSelectValue('');
    closeModule();
  };

  const submitForm = () => {
    console.log('JP', formData);
    addEdu(formData);
    setFormData({ name: '', place: [] });
    setSelectValue('');
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
        className={styles.add_edu_module_container}
      >
        <header>
          <Flex direction='row' align='center' justify='center'>
            <h3>Ny Utbildning</h3>
            <button onClick={onClose}>
              <img src='/close-module-icon.svg' alt='Cross' />
            </button>
          </Flex>
        </header>
        <form onSubmit={(e) => e.preventDefault()}>
          <Flex
            direction='column'
            gap='xxx-large'
            width='full'
            justify='space-between'
            align='center'
          >
            <Input
              width='100%'
              name='name'
              placeholder='Utbildningsnamn'
              label='Utbildningsnamn'
              value={formData.name}
              onChangeFunction={handleOnChange}
            />
            <Select
              options={placeList}
              onChangeFunction={(e) => handleSelectChange(e)}
              width='100%'
              label='Ort'
              value={selectValue}
            />
          </Flex>
        </form>
        <section>
          <div>
            <OutlinedButton onClick={onClose} text='Avbryt' width='100%' />
            <FilledButton
              onClick={submitForm}
              text='Lägg till utb.'
              width='100%'
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default AddEduModule;
