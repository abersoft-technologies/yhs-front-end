import AnimateHeight from 'react-animate-height';
import React, { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterOptions } from '../../store/slice/filterOptions';
import { setFilterQuery } from '../../store/slice/filterQuery';

import styles from './Filterinterface.module.scss';

import { Flex } from '../ui/Flex';
import { Input } from '../ui/form/input/Input';
import { Select } from '../ui/form/select/Select';
import { MultipleSelect } from '../ui/form/select/MultipleSelect';

import {
  optionsStatus,
  optionsEduType,
  optionsBranches,
} from './FilterSelectOptions';

interface IFilterInterfaceProps {
  isActive: boolean;
}
interface ContactFilterState {
  utbildning: string;
  status: string;
  ort: string;
  taggar: string[];
}
interface CorpFilterState {
  branch: string;
}
interface EduFilterState {
  branch: string;
  klassificering: string;
}

const FilterInterface = ({ isActive }: IFilterInterfaceProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const townsOptions = useSelector(
    (state: RootState) => state.filterOptionsReducer.result.towns.data
  );
  const eduOptions = useSelector(
    (state: RootState) => state.filterOptionsReducer.result.educations.data
  );
  const tagOptions = useSelector(
    (state: RootState) => state.filterOptionsReducer.result.tags.data
  );

  const height = isActive ? 'auto' : 0;
  const [contactFilter, setContactFilter] = useState<ContactFilterState>({
    utbildning: '',
    status: '',
    ort: '',
    taggar: [],
  });
  const [corpFilter, setCorpFilter] = useState<CorpFilterState>({
    branch: '',
  });
  const [eduFilter, setEduFilter] = useState<EduFilterState>({
    branch: '',
    klassificering: '',
  });

  useEffect(() => {
    const filterObj = {
      filterStatus: contactFilter.status,
      filterTown: contactFilter.ort,
      filterEdu: contactFilter.utbildning,
    };
    dispatch(setFilterQuery(filterObj));
  }, [contactFilter]);

  useEffect(() => {
    dispatch(getFilterOptions());
  }, []);

  const onChangeFilter = (label: string, value: string) => {
    if (router.pathname === '/kontakter/utbildningar') {
      setEduFilter((eduFilter) => ({
        ...eduFilter,
        [label.toLocaleLowerCase()]: value,
      }));
    } else if (router.pathname === '/kontakter/foretag') {
      setCorpFilter((corpFilter) => ({
        ...corpFilter,
        [label.toLocaleLowerCase()]: value,
      }));
    } else {
      setContactFilter((conFilter) => ({
        ...conFilter,
        [label.toLocaleLowerCase()]: value,
      }));
    }
  };
  const handleClrField = (label: string) => {
    if (router.pathname === '/kontakter/utbildningar') {
      setEduFilter((eduFilter) => ({
        ...eduFilter,
        [label.toLocaleLowerCase()]: '',
      }));
    } else if (router.pathname === '/kontakter/foretag') {
      setCorpFilter((corpFilter) => ({
        ...corpFilter,
        [label.toLocaleLowerCase()]: '',
      }));
    } else {
      setContactFilter((conFilter) => ({
        ...conFilter,
        [label.toLocaleLowerCase()]: '',
      }));
    }
  };

  const decideFilterInputs = () => {
    switch (router.pathname) {
      case '/kontakter':
        return [
          <Select
            options={eduOptions}
            label='Utbildning'
            width='250px'
            value={contactFilter.utbildning}
            onChangeFunction={onChangeFilter}
            clrAble={true}
            clearFieldFunc={handleClrField}
          />,
          <Select
            options={optionsStatus}
            label='Status'
            width='250px'
            value={contactFilter.status}
            onChangeFunction={onChangeFilter}
            clrAble={true}
            clearFieldFunc={handleClrField}
          />,
          <Select
            options={townsOptions}
            label='Ort'
            width='250px'
            value={contactFilter.ort}
            onChangeFunction={onChangeFilter}
            clrAble={true}
            clearFieldFunc={handleClrField}
          />,
          <MultipleSelect
            label='Taggar'
            onChangeFunction={handleSetTags}
            options={tagOptions}
            width='350px'
          />,
        ];
      case '/kontakter/foretag':
        return [
          <Select
            options={optionsBranches}
            value={corpFilter.branch}
            label='Branch'
            width='250px'
            onChangeFunction={onChangeFilter}
            clrAble={true}
            clearFieldFunc={handleClrField}
          />,
          <MultipleSelect
            options={optionsStatus}
            onChangeFunction={handleSetTags}
            label='Taggar'
            width='320px'
          />,
        ];
      case '/kontakter/utbildningar':
        return [
          <Select
            options={optionsBranches}
            value={eduFilter.branch}
            label='Branch'
            width='250px'
            onChangeFunction={onChangeFilter}
            clrAble={true}
            clearFieldFunc={handleClrField}
          />,
          <Select
            options={optionsEduType}
            value={eduFilter.klassificering}
            label='Klassificering'
            width='250px'
            onChangeFunction={onChangeFilter}
            clrAble={true}
            clearFieldFunc={handleClrField}
          />,
          /*     <Input
            placeholder='Sök bland taggar...'
            name='tags'
            onChangeFunction={onChange}
            label='Taggar'
            width='250px'
          />, */
        ];

      default:
        return [];
    }
  };

  const handleSetTags = (tagArray: string[]) => {
    setContactFilter((prev) => ({ ...prev, taggar: tagArray }));
  };

  let inputsArray = decideFilterInputs();

  return (
    <AnimateHeight id='example-panel' duration={200} height={height}>
      <Flex
        direction='row'
        gap='x-large'
        class={`${styles.filter_interface_container} ${
          isActive && styles.filter_interface_active
        }`}
      >
        {inputsArray.map((item, i) => {
          return <div key={i}>{item}</div>;
        })}
      </Flex>
    </AnimateHeight>
  );
};

export default FilterInterface;
