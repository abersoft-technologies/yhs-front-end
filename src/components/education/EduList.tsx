import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import EduCard from "./education_card/EduCard"
import { getEduListRedux } from '../../store/slice/eduList';
import { useDispatch, useSelector } from 'react-redux';

interface IListData {
  name: string;
  place: string[];
}

import styles from './EduList.module.scss';


const EduList = () => {
    const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const eduListReducer = useSelector(
    (state: any) => state.eduListReducer
  );
  const ListData = eduListReducer.result.data ? eduListReducer.result.data.corpList : undefined;
  const listValues = eduListReducer.result.data ? eduListReducer.result.data.listValues : undefined;

  useEffect(() => {
    dispatch(getEduListRedux({ limit: 10, page: page, queryParams: '' }));
    console.log(ListData, listValues)
  }, [page]);

    return (
        <section className={styles.edu_list_container}>
        <div className={styles.label_bar_container}>
          <div>Namn</div>
          <div>Ort</div>
        </div>
        <div></div>
        {ListData && ListData.map((item: IListData, i: number) => {
          return <EduCard
            key={i}
            name={item.name}
            place={item.place}
          />
        })}

        <Pagination
          page={page}
          setPage={setPage}
          totalPages={listValues ? listValues.totalPages : 0}
        />
        </section>
    )
}

export default EduList;