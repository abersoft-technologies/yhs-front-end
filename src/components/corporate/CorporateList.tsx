import React, { useCallback, useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import CorporateCard from './corporate_card/CorporateCard';
import { getCorporateListRedux } from '../../store/slice/corpList';
import { useDispatch, useSelector } from 'react-redux';

import styles from './CorporateList.module.scss';

import { Flex } from '../ui/Flex';
import { Text } from '../ui/text/Text';
import { RootState } from '../../store/store';

interface IListData {
  name: string;
  tags: string[];
  branch?: string;
  info: string;
  _id: string;
}

const CorporateList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pagePosition, setPagePosition] = useState(0);
  const [slicedPages, setSlicedPages] = useState(1);

  const corpListReducer = useSelector((state: any) => state.corpListReducer);
  const ListData = corpListReducer.result.data
    ? corpListReducer.result.data.corpList
    : undefined;
  const listValues = corpListReducer.result.data
    ? corpListReducer.result.data.listValues
    : undefined;

  const searchQuery = useSelector(
    (state: any) => state.searchQueryReducer.value
  );


  const filterQuery = useSelector(
    (state: RootState) => state.filterQueryReducer.filterObj
  );

  const dispatchData = useCallback(() => {
    dispatch(getCorporateListRedux({ limit: 10, page: page, queryParams: searchQuery, filterQuery: filterQuery }));
  }, [dispatch, filterQuery, page, searchQuery])

  useEffect(() => {
    setPage(1);
    setPagePosition(0);
    setSlicedPages(1);
    dispatchData();
    window.scrollTo(0, 0);

  }, [searchQuery, filterQuery, dispatch, page, corpListReducer, dispatchData]);

  // useEffect(() => {
  //   dispatch(getCorporateListRedux({ limit: 10, page: page, queryParams: '' }));
  // }, [page, dispatch]);

  return (
    <>
      <section className={styles.corporate_list_container}>
        <div></div>
        {ListData && ListData.length > 0 ? (
          ListData.map((item: IListData, i: number) => {
            return (
              <CorporateCard
                key={i}
                name={item.name}
                info={item.info}
                branch={item.branch}
                tags={item.tags}
                id={item._id}
              />
            );
          })
        ) : (
          <Flex
            direction='column'
            align='center'
            gap='medium'
            class={styles.not_found_container}
          >
            <svg
              width='50'
              height='50'
              viewBox='0 0 26 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.9996 0.497498C19.9046 0.497498 25.5021 6.095 25.5021 13C25.5021 19.9037 19.9033 25.5 12.9996 25.5C6.09457 25.5012 0.49707 19.9037 0.49707 13C0.49707 6.095 6.09457 0.497498 12.9996 0.497498ZM12.9996 2.3725C11.5943 2.35726 10.2 2.62087 8.89734 3.14809C7.59466 3.6753 6.40948 4.45565 5.4104 5.44396C4.41131 6.43227 3.61816 7.60891 3.07685 8.9058C2.53554 10.2027 2.25681 11.5941 2.25681 12.9994C2.25681 14.4047 2.53554 15.7961 3.07685 17.0929C3.61816 18.3898 4.41131 19.5665 5.4104 20.5548C6.40948 21.5431 7.59466 22.3234 8.89734 22.8507C10.2 23.3779 11.5943 23.6415 12.9996 23.6262C15.798 23.5959 18.4716 22.4629 20.4397 20.4733C22.4079 18.4837 23.5118 15.798 23.5118 12.9994C23.5118 10.2007 22.4079 7.51508 20.4397 5.52546C18.4716 3.53583 15.798 2.40285 12.9996 2.3725V2.3725ZM12.9996 14.8725C15.0383 14.8725 16.9496 15.69 18.3508 17.1162C18.4419 17.203 18.5147 17.3072 18.5647 17.4226C18.6147 17.538 18.6409 17.6624 18.6419 17.7882C18.6428 17.9139 18.6184 18.0386 18.5702 18.1548C18.5219 18.271 18.4508 18.3763 18.361 18.4644C18.2712 18.5525 18.1646 18.6216 18.0476 18.6677C17.9305 18.7137 17.8054 18.7357 17.6796 18.7324C17.5539 18.7291 17.4301 18.7005 17.3156 18.6483C17.2011 18.5962 17.0983 18.5215 17.0133 18.4287C16.4901 17.8951 15.8655 17.4715 15.1762 17.1828C14.4869 16.8941 13.7469 16.7461 12.9996 16.7475C12.2504 16.7462 11.5085 16.8951 10.8178 17.1854C10.1272 17.4756 9.50167 17.9014 8.97832 18.4375C8.89262 18.5274 8.78989 18.5995 8.67611 18.6494C8.56233 18.6993 8.43977 18.7261 8.31555 18.7282C8.19132 18.7303 8.06792 18.7077 7.95251 18.6617C7.83709 18.6157 7.73197 18.5472 7.64325 18.4603C7.55454 18.3733 7.48399 18.2695 7.43572 18.1551C7.38745 18.0406 7.36242 17.9176 7.36207 17.7934C7.36173 17.6692 7.38609 17.5461 7.43373 17.4313C7.48136 17.3166 7.55133 17.2125 7.63957 17.125C8.33746 16.4108 9.17125 15.8436 10.0918 15.4568C11.0124 15.0699 12.001 14.8712 12.9996 14.8725V14.8725ZM9.24957 8.9375C9.4584 8.93159 9.66629 8.96762 9.86095 9.04345C10.0556 9.11929 10.2331 9.23339 10.3829 9.379C10.5327 9.52462 10.6517 9.6988 10.7331 9.89124C10.8144 10.0837 10.8563 10.2905 10.8563 10.4994C10.8563 10.7083 10.8144 10.9151 10.7331 11.1075C10.6517 11.2999 10.5327 11.4741 10.3829 11.6197C10.2331 11.7654 10.0556 11.8795 9.86095 11.9553C9.66629 12.0311 9.4584 12.0672 9.24957 12.0612C8.84298 12.0497 8.45691 11.8801 8.17339 11.5885C7.88987 11.2968 7.73126 10.9061 7.73126 10.4994C7.73126 10.0926 7.88987 9.70191 8.17339 9.41025C8.45691 9.1186 8.84298 8.949 9.24957 8.9375ZM16.7496 8.9375C16.9584 8.93159 17.1663 8.96762 17.3609 9.04345C17.5556 9.11929 17.7331 9.23339 17.8829 9.379C18.0327 9.52462 18.1517 9.6988 18.2331 9.89124C18.3144 10.0837 18.3563 10.2905 18.3563 10.4994C18.3563 10.7083 18.3144 10.9151 18.2331 11.1075C18.1517 11.2999 18.0327 11.4741 17.8829 11.6197C17.7331 11.7654 17.5556 11.8795 17.3609 11.9553C17.1663 12.0311 16.9584 12.0672 16.7496 12.0612C16.343 12.0497 15.9569 11.8801 15.6734 11.5885C15.3899 11.2968 15.2313 10.9061 15.2313 10.4994C15.2313 10.0926 15.3899 9.70191 15.6734 9.41025C15.9569 9.1186 16.343 8.949 16.7496 8.9375V8.9375Z'
                fill='#22376F'
              />
            </svg>
            <Text
              text='Inga företag som matchar'
              textSize='large'
              width='auto'
            />
          </Flex>
        )}

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
    </>
  );
};

export default CorporateList;
