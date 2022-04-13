import React, { useState } from 'react';
import styled from 'styled-components';

import styles from './Pagination.module.scss';

import { Flex } from '../ui/Flex';

interface IActivePageLayerProps {
  pagePosition: number;
}
interface IButtonNumProps {
  number: number;
  middleNumber?: number;
  firstNumDots?: boolean;
  lastNumDots?: boolean;
}
interface IPaginationProps {
  setPage: (number: number) => void;
  setSlicedPages: (number: number) => void;
  setPagePosition: (number: number) => void;
  slicedPages: number;
  pagePosition: number;
  page: number;
  totalPages: number;
}

const ActivePageLayer = styled.div`
  position: absolute;
  background: #7586ce;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  transition: left 350ms ease;

  left: ${(props: IActivePageLayerProps) => props.pagePosition}px;
`;

const Pagination = ({
  page,
  setPage,
  totalPages,
  slicedPages,
  pagePosition,
  setSlicedPages,
  setPagePosition,
}: IPaginationProps) => {
  const [hoverDotsLeft, setHoverDotsLeft] = useState(false);
  const [hoverDotsRight, setHoverDotsRight] = useState(false);
  let arrayPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNumberClicked = (event: any) => {
    let numberPressed = parseInt(event.target.innerText);
    const lastPageNumber = arrayPages[arrayPages.length - 1];
    let btnName = event.target.closest('button').name;
    let doubleRight = btnName === 'double-right';
    let doubleLeft = btnName === 'double-left';
    let numbersLeft = lastPageNumber - page;

    if (totalPages < 10) {
      setPagePosition(numberPressed - 1);
      setPage(numberPressed);
      return;
    }

    if (doubleRight) {
      if (pagePosition <= 3) {
        setPagePosition(4);
        setSlicedPages(3);
        setPage(7);
      } else if (numbersLeft > 6) {
        setPagePosition(4);
        setSlicedPages(slicedPages + 3);
        setPage(page + 3);
      } else if (numbersLeft === 6) {
        setPagePosition(4);
        setSlicedPages(slicedPages + 2);
        setPage(page + 2);
      } else if (numbersLeft === 5) {
        setPagePosition(4);
        setSlicedPages(slicedPages + 1);
        setPage(page + 1);
      }
      return;
    } else if (doubleLeft) {
      if (pagePosition > 4) {
        setPagePosition(4);
        setPage(lastPageNumber - 6);
        setSlicedPages(lastPageNumber - 10);
      } else if (page > 7) {
        setPagePosition(4);
        setSlicedPages(slicedPages - 3);
        setPage(page - 3);
      } else if (page === 7) {
        setPagePosition(4);
        setSlicedPages(slicedPages - 2);
        setPage(page - 2);
      } else if (page === 6) {
        setPagePosition(4);
        setSlicedPages(slicedPages - 1);
        setPage(page - 1);
      }
    } else if (numberPressed === lastPageNumber) {
      setPagePosition(8);
      setPage(lastPageNumber);
      setSlicedPages(lastPageNumber - 8);
    } else if (lastPageNumber - numberPressed <= 3) {
      setPage(numberPressed);
      setPagePosition(8 - (lastPageNumber - numberPressed));
      setSlicedPages(lastPageNumber - 8);
    } else if (numberPressed > 5) {
      setPagePosition(4);
      setPage(numberPressed);
      setSlicedPages(numberPressed - 4);
    } else {
      setPagePosition(numberPressed - 1);
      setPage(numberPressed);
      setSlicedPages(1);
    }
  };

  const handleNavigationClicked = (e: any) => {
    const lastPageNumber = arrayPages[arrayPages.length - 1];
    const direction = e.target.name;
    const pagesLeftEnd = lastPageNumber - page;
    const pagesLeftStart = page - 1;

    if (direction === 'next' && page !== totalPages) {
      if (pagesLeftEnd > 4 && pagePosition === 4) {
        setPage(page + 1);
        setSlicedPages(slicedPages + 1);
      } else {
        setPage(page + 1);
        setPagePosition(pagePosition + 1);
      }
    }

    if (direction === 'previous' && page !== 1) {
      if (pagesLeftStart > 4 && pagePosition === 4) {
        setPage(page - 1);
        setSlicedPages(slicedPages - 1);
      } else {
        setPage(page - 1);
        setPagePosition(pagePosition - 1);
      }
    }
  };

  const MiddleNumbers = () => {
    const lastPageNumber = arrayPages[arrayPages.length - 1];
    const pagesLeftEnd = lastPageNumber - page;
    const pagesLeftStart = page - 1;
    const middleNumberArray = arrayPages.slice(1, arrayPages.length - 1);

    if (totalPages < 10) {
      return (
        <>
          {arrayPages.slice(1, arrayPages.length - 1).map((item, i) => {
            return <ButtonNumber key={i} number={item} />;
          })}
        </>
      );
    }

    if (pagePosition >= 4) {
      let slicedArrray = middleNumberArray.slice(
        slicedPages - 1,
        slicedPages + 6
      );
      return (
        <>
          {slicedArrray.map((item, i) => {
            return (
              <ButtonNumber
                key={i}
                number={item}
                middleNumber={slicedArrray[3]}
                firstNumDots={pagesLeftStart >= 5 && slicedArrray[0] === item}
                lastNumDots={
                  pagesLeftEnd >= 5 &&
                  slicedArrray[slicedArrray.length - 1] === item
                }
              />
            );
          })}
        </>
      );
    } else {
      let slicedArrray = middleNumberArray.slice(slicedPages, slicedPages + 6);
      return (
        <>
          {arrayPages.slice(slicedPages, slicedPages + 7).map((item, i) => {
            return (
              <ButtonNumber
                key={i}
                number={item}
                lastNumDots={
                  pagesLeftEnd >= 5 &&
                  slicedArrray[slicedArrray.length - 1] === item
                }
              />
            );
          })}
        </>
      );
    }
  };

  const ButtonNumber = ({
    number,
    middleNumber,
    firstNumDots,
    lastNumDots,
  }: IButtonNumProps) => {
    const setClassName = () => {
      if (pagePosition >= 5) {
        return number === page ? styles.active_number : '';
      } else if (pagePosition === 5) {
        return page === number ? styles.active_number : '';
      } else if (middleNumber) {
        return middleNumber === number ? styles.active_number : '';
      } else {
        return number - 1 === pagePosition ? styles.active_number : '';
      }
    };

    const setButtonContent = () => {
      if (firstNumDots) {
        return (
          <button
            onClick={() => {
              handleNumberClicked(event);
              setHoverDotsLeft(false);
            }}
            className={setClassName()}
            type='button'
            onMouseEnter={() => setHoverDotsLeft(true)}
            onMouseLeave={() => setHoverDotsLeft(false)}
            name='double-left'
          >
            <span className={styles.double_chevron}>
              {hoverDotsLeft ? (
                <img src='/chevron-double-left.svg' alt='Chevron double' />
              ) : (
                '...'
              )}
            </span>
          </button>
        );
      } else if (lastNumDots) {
        return (
          <button
            onClick={() => {
              handleNumberClicked(event);
              setHoverDotsRight(false);
            }}
            className={setClassName()}
            type='button'
            onMouseEnter={() => setHoverDotsRight(true)}
            onMouseLeave={() => setHoverDotsRight(false)}
            name='double-right'
          >
            <span className={styles.double_chevron}>
              {hoverDotsRight ? (
                <img src='/chevron-double-right.svg' alt='Chevron double' />
              ) : (
                '...'
              )}
            </span>
          </button>
        );
      } else {
        return (
          <button
            onClick={handleNumberClicked}
            className={setClassName()}
            type='button'
          >
            <span>{number}</span>
          </button>
        );
      }
    };

    return <>{setButtonContent()}</>;
  };

  return (
    <Flex
      direction='row'
      align='center'
      gap='xxx-large'
      class={styles.pagination_container}
    >
      <Flex
        direction='row'
        align='center'
        gap='small'
        class={styles.pagination_navigation}
      >
        <button
          name='previous'
          type='button'
          onClick={handleNavigationClicked}
          className={pagePosition === 0 ? styles.button_off : ''}
        >
          <img src='/chevron-left.svg' alt='Chevron' />
        </button>
        <Flex direction='row' gap='x-small'>
          <ButtonNumber number={1} />
          {totalPages > 1 && <MiddleNumbers />}
          {totalPages > 1 && (
            <ButtonNumber number={arrayPages[arrayPages.length - 1]} />
          )}
          <ActivePageLayer
            pagePosition={pagePosition * 4 + pagePosition * 32}
          />
        </Flex>
        <button
          name='next'
          onClick={handleNavigationClicked}
          className={
            page === arrayPages[arrayPages.length - 1] ? styles.button_off : ''
          }
        >
          <img src='/chevron-left.svg' alt='Chevron' />
        </button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
