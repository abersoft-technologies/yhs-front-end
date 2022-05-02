/* eslint-disable */

import React, {useState, useEffect, useCallback} from "react";
import { OutlinedButton } from "../ui/buttons/Buttons";
import { Flex } from "../ui/Flex";
import {Input} from "../ui/form/input/Input";
import { Select } from "../ui/form/select/Select";
import styles from "./Goals.module.scss"
import { getAll, getEdu } from "../../apis/edu/get"
import { updateEdu } from "../../apis/edu/update"
import { useAppDispatch } from "../../hooks/useStore";
import { showInfoBox } from "../../store/slice/infoBox";


interface IGoalData {
    letters: number;
    employements: number;
    internships: number;
}

interface IEduObject {
    name: string;
    place: string;
    shortName: string;
    type: string;
    _id: string;
    goal?: {
        letters: Number,
        internships: Number,
        employements: Number,
    }
}

interface IEducation {
    value: string;
    label: string;
}

interface IGoalProps {
    id: string;
    currentGoals?: IGoalData;
}

const Goals = ({id, currentGoals}: IGoalProps) => {
    const dispatch = useAppDispatch();
    const [goalData, setGoalData] = useState<IGoalData>({letters: 0, employements: 0, internships: 0});
    const [educations, setEducations] = useState<Array<IEduObject>>([]);
    const [optionList, setOptionList] = useState<Array<{value: string, label: string, id: string}>>([]);
    const [education, setEducation] = useState<IEducation>({label: "", value: ""});
    const [show, setShow] = useState<boolean>(true);

    const getAllEdus = async () => {
        await getAll().then(res => {
            console.log("Edus ->", res?.data.data.eduList)
            setEducations(res?.data.data.eduList)
        }).catch(err => console.log(err))
    }

    const createOptionList = useCallback( () => {
        const list: Array<{value: string, label: string, id: string}> = [];

        educations && educations.forEach((item) => {
            const obj = {value: item.name, label: item.name, id: item._id}
            list.push(obj)
        })
        setOptionList(list)
    }, [])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        setGoalData({ ...goalData, [name]: e.target.value });
      };

      const onSubmit = async (e: any) => {
        e.preventDefault();
        const result = await updateEdu(id, {goal: {...goalData}});
        if(result?.status === 200) {
            dispatch(showInfoBox({infoText: "Du har uppdaterat målen för denna utbildning", time: 3000, type: "success"}))
        }
      }

      const handleOnChangeSelect = (label: string, value: string, _id?: string) => {
        setEducation({label: label, value: value})
        // setId(_id!)
      };

      const educationLength = educations && educations.length
      const optionLength = optionList && optionList.length;

      useEffect(() => {
          console.log(currentGoals)
          if(currentGoals) setGoalData(currentGoals);
      }, [currentGoals])

      useEffect(() => {
        getAllEdus();
        createOptionList()
      }, [educationLength, optionLength, createOptionList])

    return (
        <Flex direction="column" align="flex-start" justify="center" class={styles.goalCard}>
            <h1>
                Sätt mål
            </h1>
                <form className={styles.selectContainer}>
                    {/* <Select
                        options={optionList}
                        label="utbildning"
                        value={education.value}
                        onChangeFunction={(
                            label: string,
                            value: string,
                            id?: string
                        ) => handleOnChangeSelect(label, value, id)}
                        width="25%"
                    /> */}
                    <Input type="number" name="letters" label="Avsiktsförklaringar" placeholder="Skriv här..." value={goalData.letters} onChangeFunction={handleOnChange}  width="90%"/>
                    <Input type="number" name="employements" label="Anställningar" placeholder="Skriv här..." value={goalData.employements} onChangeFunction={handleOnChange}  width="90%"/>
                    <Input type="number" name="internships" label="LIA" placeholder="Skriv här..." value={goalData.internships} onChangeFunction={handleOnChange} width="90%"/>
                    <Flex direction="row" align="flex-start" class={styles.buttonContainer}>
                        <OutlinedButton text="Uppdatera dina mål" onClick={(e: any) => onSubmit(e)} />
                    </Flex>
                </form>
        </Flex>
    )
}

export default Goals;