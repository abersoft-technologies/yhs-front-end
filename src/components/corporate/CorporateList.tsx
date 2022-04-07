import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import CorporateCard from "./corporate_card/CorporateCard"
import { getCorporateListRedux } from '../../store/slice/corpList';
import { useDispatch, useSelector } from 'react-redux';

interface IListData {
  name: string;
  tags: string[];
  info: string;
}

import styles from './CorporateList.module.scss';


const CorporateList = () => {
    const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const corpListReducer = useSelector(
    (state: any) => state.corpListReducer
  );
  const ListData = corpListReducer.result.data ? corpListReducer.result.data.corpList : undefined;
  const listValues = corpListReducer.result.data ? corpListReducer.result.data.listValues : undefined;

  useEffect(() => {
    dispatch(getCorporateListRedux({ limit: 10, page: page, queryParams: '' }));
    console.log(ListData, listValues)
  }, [page]);

    return (
        <section className={styles.corporate_list_container}>
        <div className={styles.label_bar_container}>
          <div>Namn</div>
          <div>Taggar</div>
          <div>Övrig info</div>
        </div>
        <div></div>
        {ListData && ListData.map((item: IListData, i: number) => {
          return <CorporateCard
            key={i}
            name={item.name}
            info={item.info}
            tags={item.tags}
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

export default CorporateList;