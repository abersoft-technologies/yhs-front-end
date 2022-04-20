import React, { useEffect, useState } from 'react';
import { FilledButton, OutlinedButton } from '../../ui/buttons/Buttons';
import { Flex } from '../../ui/Flex';
import { Input } from '../../ui/form/input/Input';
import { Textarea } from '../../ui/form/textarea/Textarea';
import ModuleDarkLayer from '../ModuleDarkLayer';
import styles from './AddEduModule.module.scss';
import { addCorp } from '../../../apis/corp/add';
import { Select } from '../../ui/form/select/Select';
import { addEdu } from '../../../apis/edu/add';
import { useDispatch, useSelector } from 'react-redux';
import { InfoBox } from '../../ui/info/InfoBox';
import { Text } from '../../ui/text/Text';
import { showInfoBox } from '../../../store/slice/infoBox';

interface IModuleProps {
  active: boolean;
  closeModule: () => void;
  contactList: Array<{ value: string; label: string }>;
  listDataContacts: Array<IContactData>;
}

interface IContactData {
  company: string;
  date: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  status: string;
  town: string;
  _id: string;
}

interface IAddEduForm {
  name: string;
  place: string;
  shortName: string;
  type: string;
  managementList: Array<string>;
}

interface IManagementObject {
  name: string;
  phoneNumber: string;
  email: string;
  place: string;
}

const AddEduModule = ({
  active,
  closeModule,
  contactList,
  listDataContacts,
}: IModuleProps) => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState<IAddEduForm>({
    name: '',
    place: '',
    shortName: '',
    type: '',
    managementList: [],
  });
  const [selectValue, setSelectValue] = useState<string>('');
  const [id, setId] = useState<string>('');

  const [managementValue, setManagementValue] = useState<string>(
    contactList[0] ? contactList[0].value : ''
  );
  const [doShowInfoBox, setDoShowInfoBox] = useState<boolean>(false);
  const [doShowManagementInfoBox, setDoShowManagementInfoBox] =
    useState<boolean>(false);

  doShowManagementInfoBox;
  const placeList = [
    { value: 'Uppsala', label: 'Uppsala' },
    { value: 'Stockholm', label: 'Stockholm' },
    { value: 'Allingsås', label: 'Allingsås' },
  ];

  const types = [
    { value: 'Ny ansökan', label: 'Ny ansökan' },
    { value: 'Omsök', label: 'Omsök' },
  ];

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let name = e.target.name;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSelectChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setSelectValue(e.currentTarget.id);
  };

  const onClose = () => {
    setFormData({
      name: '',
      place: '',
      shortName: '',
      type: '',
      managementList: [],
    });
    setSelectValue('');
    closeModule();
  };

  const submitForm = () => {
    addEdu(formData);
    setFormData({
      name: '',
      place: '',
      shortName: '',
      type: '',
      managementList: [],
    });
    setSelectValue('');
    dispatch(showInfoBox({infoText: "Du har lagt till en ny utbildning", showBox: true, time: 3000, type: "success"}))
    onClose();
  };

  const addManagementValue = () => {
    setDoShowManagementInfoBox(true);
    const list = formData.managementList;
    list.push(id);
    setFormData((prev) => ({ ...prev, managementList: list }));
    setTimeout(() => {
      setDoShowManagementInfoBox(false);
      setManagementValue('');
    }, 1500);
    console.log(formData);
  };

  const onChangeManagement = (label: string, value: string, id?: string) => {
    setManagementValue(value);
    setId(id!);
    console.log(formData);
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
            gap='medium'
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
            <Flex direction='column' class={styles.short_name_container}>
              <Input
                width='100%'
                name='shortName'
                placeholder='Förkortad betäckning'
                label='Förkortad betäckning'
                value={formData.shortName}
                onChangeFunction={handleOnChange}
                maxLength={6}
              />
              <Text color='#c4c4c4' text='Max 6 tecken' />
            </Flex>
            <Select
              options={types}
              onChangeFunction={(label: string, value: string) =>
                setFormData((prev) => ({ ...prev, type: value }))
              }
              width='100%'
              label='Typ av ansökan'
              value={formData.type}
            />
            {formData.type === 'Omsök' ? (
              <>
                <Select
                  value={managementValue}
                  options={contactList}
                  width='100%'
                  label='Lägg till i ledningsgrupp'
                  onChangeFunction={(
                    label: string,
                    value: string,
                    id?: string
                  ) => onChangeManagement(label, value, id)}
                />
                <Flex direction='row' width='full'>
                  <FilledButton
                    onClick={addManagementValue}
                    text='Lägg till'
                    width='40%'
                  />
                </Flex>
              </>
            ) : null}
            <Select
              options={placeList}
              onChangeFunction={(label: string, value: string) =>
                setFormData((prev) => ({ ...prev, place: value }))
              }
              width='100%'
              label='Ort'
              value={formData.place}
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
