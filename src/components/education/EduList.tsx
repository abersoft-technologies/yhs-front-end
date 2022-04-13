import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import EduCard from './education_card/EduCard';
import { getEduListRedux } from '../../store/slice/eduList';
import { useDispatch, useSelector } from 'react-redux';

interface IListData {
  name: string;
  shortName: string;
  type: string;
  managementList: string[];
  place: string;
}

import styles from './EduList.module.scss';

const EduList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pagePosition, setPagePosition] = useState(0);
  const [slicedPages, setSlicedPages] = useState(1);

  const eduListReducer = useSelector((state: any) => state.eduListReducer);
  const ListData = eduListReducer.result.data
    ? eduListReducer.result.data.corpList
    : undefined;
  const listValues = eduListReducer.result.data
    ? eduListReducer.result.data.listValues
    : undefined;

  useEffect(() => {
    dispatch(getEduListRedux({ limit: 10, page: page, queryParams: '' }));
    console.log(ListData, listValues);
  }, [page]);

  return (
    <section className={styles.edu_list_container}>
      <div className={styles.label_bar_container}>
        <div>Namn</div>
        <div>Förkortning</div>
        <div>typ</div>
        <div>Ledningsgrupp</div>
        <div>Ort</div>
      </div>
      <div></div>
      {ListData &&
        ListData.map((item: IListData, i: number) => {
          return (
            <EduCard
              key={i}
              shortName={item.shortName}
              type={item.type}
              managementList={item.managementList}
              name={item.name}
              place={item.place}
            />
          );
        })}

      <Pagination
        page={page}
        pagePosition={pagePosition}
        slicedPages={slicedPages}
        setPage={setPage}
        setPagePosition={setPagePosition}
        setSlicedPages={setSlicedPages}
        totalPages={listValues ? listValues.totalPages : 0}
      />
    </section>
  );
};

export default EduList;
