import React, { useState } from 'react';
import { FilledButton, OutlinedButton } from '../../ui/buttons/Buttons';
import { Flex } from '../../ui/Flex';
import { Input } from '../../ui/form/input/Input';
import { Textarea } from '../../ui/form/textarea/Textarea';
import ModuleDarkLayer from '../ModuleDarkLayer';
import styles from './AddCorporateModule.module.scss';
import { addCorp } from '../../../apis/corp/add';
import { InfoBox } from '../../ui/info/InfoBox';
import { Text } from '../../ui/text/Text';

interface IModuleProps {
  active: boolean;
  closeModule: () => void;
}

interface IAddCorporateForm {
  name: string;
  tags: string[];
  info: string;
}

const AddCorporateModule = ({ active, closeModule }: IModuleProps) => {
  const [formData, setFormData] = useState<IAddCorporateForm>({
    name: '',
    tags: [],
    info: '',
  });
  const [tag, setTag] = useState<string>('');
  const [doShowInfoBox, setDoShowInfoBox] = useState<boolean>(false)
  const [doShowTagInfoBox, setDoShowTagInfoBox] = useState<boolean>(false)


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

  const addTag = () => {
    if (tag === '') return;
    setDoShowTagInfoBox(true)
    const tempTags = formData.tags;
    tempTags.push(tag);
    setFormData((prev) => ({ ...prev, tags: tempTags }));
    setTimeout(() => {
      setDoShowTagInfoBox(false)
      setTag('');
    }, 1000);
  };

  const submitForm = () => {
    addCorp(formData);
    setFormData({ name: '', tags: [], info: '' });
    setTag('');
    setDoShowInfoBox(true)
    closeModule();

    setTimeout(() => {
      setDoShowInfoBox(false)
    }, 3000);
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
        className={styles.add_corp_module_container}
      >
        <header>
          <Flex direction='row' align='center' justify='center'>
            <h3>Nytt företag</h3>
            <button onClick={closeModule}>
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
              placeholder='Företag'
              label='Företag'
              value={formData.name}
              onChangeFunction={handleOnChange}
            />
            <Flex direction='column' width='full' gap='medium'>
              <Input
                width='100%'
                name='tag'
                placeholder='Taggar'
                label='Taggar'
                value={tag}
                onChangeFunction={handleOnChange}
              />
              <Flex direction='row' gap='medium' wrap='wrap'>
                {formData.tags.map((item, i) => {
                  return <Text text={item} key={i} color="grey" />
                })}
              </Flex>
              <OutlinedButton
                onClick={addTag}
                text='Lägg till tag'
                width='30%'
              />
            </Flex>
            <Textarea
              name='info'
              cols={20}
              rows={5}
              label='Övrig information'
              placeholder='Övrig information...'
              value={formData.info}
              width={'full'}
              onChangeFunc={handleOnChange}
            />
          </Flex>
        </form>
        <section>
          <div>
            <OutlinedButton onClick={closeModule} text='Avbryt' width='100%' />
            <FilledButton
              onClick={submitForm}
              text='Lägg till företag'
              width='100%'
            />
          </div>
        </section>
      </div>
      <InfoBox infoText='Du har lagt till ett nytt företag' showBox={doShowInfoBox} type="success" />
      <InfoBox infoText={"Du har lagt till en ny tag"} showBox={doShowTagInfoBox} type="success" />
    </>
  );
};

export default AddCorporateModule;
