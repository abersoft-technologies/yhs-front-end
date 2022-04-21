import React, {useState} from "react";
import { OutlinedButton } from "../ui/buttons/Buttons";
import { Flex } from "../ui/Flex";
import {Input} from "../ui/form/input/Input";
import { Select } from "../ui/form/select/Select";
import styles from "./Goals.module.scss"

interface IGoalData {
    letters: string;
    employements: string;
    internships: string;
}

const options = [
    { value: '0', label: '0' },
    { value: '1-2', label: '1-2' },
    { value: '3-5', label: '3-5' },
    { value: '7-10', label: '7-10' },
    { value: '11-20', label: '11-20' },
];

const Goals = () => {
    const [goalData, setGoalData] = useState<IGoalData>({letters: "", employements: "", internships: ""});

    const handleOnChange = (label: string, value: string) => {
        switch (label) {
            case 'Avsiktsförklaringar':
              return setGoalData({
                ...goalData,
                letters: value,
              });
            case 'Anställningar':
              return setGoalData({
                ...goalData,
                employements: value,
              });
            case 'LIA':
              return setGoalData({
                ...goalData,
                internships: value,
              });
            default:
              return setGoalData({
                ...goalData,
              });
          }
      };

      const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(goalData)
        setGoalData({employements: "", internships: "", letters: ""})
      }

    return (
        <Flex direction="column" width="full" align="center" justify="center">
            <h1>
                Dina Mål
            </h1>
                <form style={{width: "100%"}} className={styles.selectContainer}>
                    <Select label="Avsiktsförklaringar" value={goalData.letters} onChangeFunction={handleOnChange} options={options} width="25%"/>
                    <Select label="Anställningar" value={goalData.employements} onChangeFunction={handleOnChange} options={options} width="25%"/>
                    <Select label="LIA" value={goalData.internships} onChangeFunction={handleOnChange} options={options} width="25%"/>
                    <Flex direction="row" align="flex-start" class={styles.buttonContainer}>
                        <OutlinedButton text="Lägg till dina mål" onClick={(e: any) => onSubmit(e)} />
                    </Flex>
                </form>
        </Flex>
    )
}

export default Goals;