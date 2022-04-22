import React, { useState, useEffect } from 'react';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addCorp } from '../../../apis/corp/add';

/* Styles import */
import styles from './AddCorporateModule.module.scss';

/* Component imports */
import { FilledButton, OutlinedButton } from '../../ui/buttons/Buttons';
import { Flex } from '../../ui/Flex';
import { Input } from '../../ui/form/input/Input';
import { Textarea } from '../../ui/form/textarea/Textarea';
import ModuleDarkLayer from '../ModuleDarkLayer';
import { InfoBox } from '../../ui/info/InfoBox';
import { MultipleSelect } from '../../ui/form/select/MultipleSelect';
import { showInfoBox } from '../../../store/slice/infoBox';
import { getCorporateListRedux } from '../../../store/slice/corpList';
import { add } from '../../../store/slice/userSlice';

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
  const dispatch = useDispatch();
  const corpListReducer = useSelector((state: any) => state.corpListReducer);

  const tagsOptions = useSelector(
    (state: RootState) => state.filterOptionsReducer.result.tags.data
  );
  const ListData: IAddCorporateForm[] = corpListReducer.result.data
    ? corpListReducer.result.data.corpList
    : undefined;
  const [formData, setFormData] = useState<IAddCorporateForm>({
    name: '',
    tags: [],
    info: '',
  });
  const [doShowInfoBox, setDoShowInfoBox] = useState<boolean>(false);

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let name = e.target.name;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSetTags = (tagArray: string[]) => {
    setFormData((prev) => ({ ...prev, tags: tagArray }));
  };

  const submitForm = () => {
    const tempList = ListData;
    console.log("JP TempList",tempList)
    addCorp(formData).then(res => {
      console.log(res?.data);
      tempList.push(res?.data)
      // dispatch(add(tempList))
    }).catch(err => console.log(err));
    setFormData({ name: '', tags: [], info: '' });
    dispatch(showInfoBox({infoText: "Du har lagt till ett nytt företag", time: 3000, type: "success"}))
    closeModule();
  };

  useEffect(() => {
    dispatch(getCorporateListRedux({limit: 0, queryParams: ''}))
  }, [])

  return (
    <>
      <ModuleDarkLayer active={active} />
      <div
        style={
          active
            ? { right: '0', opacity: '1' }
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
            gap='medium'
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
              <MultipleSelect
                width='100%'
                onChangeFunction={handleSetTags}
                label='Taggar'
                options={tagsOptions}
                addAble={true}
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
    </>
  );
};

export default AddCorporateModule;
