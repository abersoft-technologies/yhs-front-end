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

interface IFilterState {
  utbildning: string;
  status: string;
  ort: string;
  taggar: string[];
  branchedu: string;
  branchcorp: string;
  klassificering: string;
}

interface IFilterObject {
    filterStatus: string;
    filterTown: string;
    filterEdu: string;
    filterBranchEdu: string,
    filterBranchCorp: string,
    filterType: string,
    filterTags: string[],
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

  const branchEduOptions = useSelector(
    (state: RootState) => state.filterOptionsReducer.result.branchEdu.data
  );
  const branchCorpOptions = useSelector(
    (state: RootState) => state.filterOptionsReducer.result.branchCorp.data
  );

  const height = isActive ? 'auto' : 0;
  const [filter, setFilter] = useState<IFilterState>({utbildning: '', status: '', ort: '', taggar: [''], branchedu: '', branchcorp: '', klassificering: ''})

  useEffect(() => {
    const filterObj: IFilterObject = {
        filterStatus: filter.status,
        filterTown: filter.ort,
        filterEdu: filter.utbildning,
        filterBranchCorp: filter.branchcorp,
        filterBranchEdu: filter.branchedu,
        filterTags: filter.taggar,
        filterType: filter.klassificering,
    };
    console.log("FilterOBJC ---->", filterObj)
    dispatch(setFilterQuery({filterObj: {...filterObj}}));
  }, [filter]);

  useEffect(() => {
    dispatch(getFilterOptions());
  }, []);

  const onChangeFilter = (label: string, value: string) => {
    setFilter((filter) => ({
      ...filter, [label.toLocaleLowerCase()]: value
    }))
  };
  const handleClrField = (label: string) => {
    setFilter((filter) => ({
      ...filter, [label.toLocaleLowerCase()]: ''
    }))
  };

  const decideFilterInputs = () => {
    switch (router.pathname) {
      case '/kontakter':
        return [
          <Select
            options={eduOptions}
            label='Utbildning'
            width='250px'
            value={filter.utbildning}
            onChangeFunction={onChangeFilter}
            clrAble={true}
            clearFieldFunc={handleClrField}
          />,
          <Select
            options={optionsStatus}
            label='Status'
            width='250px'
            value={filter.status}
            onChangeFunction={onChangeFilter}
            clrAble={true}
            clearFieldFunc={handleClrField}
          />,
          <Select
            options={townsOptions}
            label='Ort'
            width='250px'
            value={filter.ort}
            onChangeFunction={onChangeFilter}
            clrAble={true}
            clearFieldFunc={handleClrField}
          />,
          <MultipleSelect
            label='Taggar'
            onChangeFunction={handleSetTags}
            options={tagOptions}
            width='320px'
          />,
        ];
      case '/kontakter/foretag':
        return [
          <Select
            options={branchCorpOptions}
            value={filter.branchcorp}
            label='branchcorp'
            absoluteLabel='Branch'
            placeholder='branch'
            width='250px'
            onChangeFunction={onChangeFilter}
            clrAble={true}
            clearFieldFunc={handleClrField}
          />,
          <MultipleSelect
            options={tagOptions}
            onChangeFunction={handleSetTags}
            label='Taggar'
            width='320px'
          />,
        ];
      case '/kontakter/utbildningar':
        return [
          <Select
            options={branchEduOptions}
            value={filter.branchedu}
            label='branchedu'
            absoluteLabel='Branch'
            placeholder='branch'
            width='250px'
            onChangeFunction={onChangeFilter}
            clrAble={true}
            clearFieldFunc={handleClrField}
          />,
          <Select
            options={optionsEduType}
            value={filter.klassificering}
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
    setFilter((prev) => ({ ...prev, taggar: tagArray }));
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
