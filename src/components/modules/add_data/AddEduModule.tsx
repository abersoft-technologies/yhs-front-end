import React, { useState } from "react"
import { FilledButton, OutlinedButton } from "../../ui/buttons/Buttons";
import { Flex } from "../../ui/Flex";
import { Input } from "../../ui/form/input/Input";
import { Textarea } from "../../ui/form/textarea/Textarea";
import ModuleDarkLayer from "../ModuleDarkLayer";
import styles from './AddEduModule.module.scss';
import { addCorp } from '../../../apis/corp/add';
import { Select } from "../../ui/form/select/Select";


interface IModuleProps {
    active: boolean;
    closeModule: () => void;
  }

interface IAddCorporateForm {
    name: string,
    tags: string[],
    info: string,
}

const AddEduModule = ({active, closeModule}: IModuleProps) => {
    const [formData, setFormData] = useState<IAddCorporateForm>({
        name: '',
        tags: [],
        info: ''
    });
    const [tag, setTag] = useState<string>("")
    const [selectValue, setSelectValue] = useState<string>("")


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let name = e.target.name;
        console.log(name, e.target.value, formData);
        setFormData({ ...formData, [name]: e.target.value });
        if(e.target.name === "tag") {
          setTag(e.target.value)
        }
    };

    const handleSelectChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectValue(e.currentTarget.id)
    }

    const addTag = () => {
      if(tag === "") return;
      const tempTags = formData.tags;
      tempTags.push(tag);
      setFormData(prev => ({...prev, tags: tempTags}))
      setTag("")
    }

    const submitForm = () => {
      console.log("JP", formData)
      addCorp(formData)
      setFormData({name: "", tags: [], info: ""})
      setTag("")
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
                <button onClick={closeModule}>
                  <img src='/close-module-icon.svg' alt='Cross' />
                </button>
              </Flex>
            </header>
            <form onSubmit={e => e.preventDefault()}>
              <Flex
                direction='column'
                gap='xxx-large'
                width='full'
                justify='space-between'
                align="center"
              >
                <Input
                  width='100%'
                  name='Utbildningsnamn'
                  placeholder='Företag'
                  label='Företag'
                  value={formData.name}
                  onChangeFunction={handleOnChange}
                />
                <Select
                    options={[{value: "Uppsala", label: "Uppsala"}]}
                    onChangeFunction={(e) => handleSelectChange(e)}
                    width='100%'
                    label='Ort'
                    value={selectValue}
                />
                </Flex>

            </form>
            <section>
              <div>
                <OutlinedButton onClick={closeModule} text='Avbryt' width='100%' />
                <FilledButton onClick={submitForm} text='Lägg till Utbildning' width='100%' />
              </div>
            </section>
          </div>
        </>
      );
}

export default AddEduModule;