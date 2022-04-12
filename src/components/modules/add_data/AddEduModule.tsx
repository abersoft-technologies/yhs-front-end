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
import { useSelector } from 'react-redux';
import { InfoBox } from "../../ui/info/InfoBox"

interface IModuleProps {
  active: boolean;
  closeModule: () => void;
  contactList: Array<{value: string, label: string}>;
}

interface IAddEduForm {
  name: string;
  place: string;
  shortName: string;
  type: string;
  managementList: Array<string>;
}



const AddEduModule = ({ active, closeModule, contactList }: IModuleProps) => {
  const [formData, setFormData] = useState<IAddEduForm>({
    name: '',
    place: "",
    shortName: "",
    type: "",
    managementList: [],
  });
  const [selectValue, setSelectValue] = useState<string>('');
  const [managementValue, setManagementValue] = useState<string>(contactList[0] ? contactList[0].value : "")
  const [doShowInfoBox, setDoShowInfoBox] = useState<boolean>(false)




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
    if(name === "shortName" && formData.shortName.length < 6) {
      setFormData({ ...formData, shortName: e.target.value });
      console.log("Kommer in hit", formData.shortName.length)
    } else if(name !== "shortName") {
      setFormData({ ...formData, [name]: e.target.value });
    }
    console.log(formData)
  };

  const handleSelectChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setSelectValue(e.currentTarget.id)
  };

  const onClose = () => {
    setFormData({ name: '', place: "", shortName: "", type: "", managementList: [] });
    setSelectValue('');
    closeModule();
  };

  const submitForm = () => {
    addEdu(formData);
    setFormData({ name: '', place: "", shortName: "", type: "", managementList: []});
    setSelectValue('');
    setDoShowInfoBox(true);
    onClose();

    setTimeout(() => {
      setDoShowInfoBox(false)
    }, 3000);
  };

  const addManagementValue = () => {
    const list = formData.managementList;
    list.push(managementValue);
    setFormData(prev => ({...prev, managementList: list}))
    setManagementValue("")
  }

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
            <Input
              width='100%'
              name='shortName'
              placeholder='Förkortad betäckning'
              label='Förkortad betäckning'
              value={formData.shortName}
              onChangeFunction={handleOnChange}
            />
            <Select
              options={types}
              onChangeFunction={(e) => setFormData(prev => ({...prev, type: e.currentTarget.id}))}
              width='100%'
              label='Typ av ansökan'
              value={formData.type}
            />
            {formData.type === "Omsök" ?
            <>
              <Select
                value={managementValue}
                options={contactList}
                width='100%'
                label="Lägg till i ledningsgrupp"
                onChangeFunction={(e) => setManagementValue(e.currentTarget.id)}
              />
              <Flex direction='row' width='full'>
              <FilledButton
                onClick={addManagementValue}
                text='Lägg till i ledningsform'
                width='50%'
              />
              </Flex>
              </>
            : null}
            <Select
              options={placeList}
              onChangeFunction={(e) => setFormData(prev => ({...prev, place: e.currentTarget.id}))}
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
      <InfoBox infoText='Du har lagt till en ny utbildning' showBox={doShowInfoBox} type="success" />
    </>
  );
};

export default AddEduModule;
