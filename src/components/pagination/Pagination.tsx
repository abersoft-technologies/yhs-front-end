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

const ActivePageLayer = styled.div`
  position: absolute;
  background: #7586ce;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  transition: left 350ms ease;

  left: ${(props: IActivePageLayerProps) => props.pagePosition}px;
`;

const Pagenation = () => {
  const [pagePosition, setPagePosition] = useState(0);
  const [activeNumber, setActiveNumber] = useState(1);
  const [slicedPages, setSlicedpage] = useState(1);
  const [hoverDotsLeft, setHoverDotsLeft] = useState(false);
  const [hoverDotsRight, setHoverDotsRight] = useState(false);
  let arrayPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const handleNumberClicked = (event: any) => {
    let numberPressed = parseInt(event.target.innerText);
    const lastPageNumber = arrayPages[arrayPages.length - 1];
    let btnName = event.target.closest('button').name;
    let doubleRight = btnName === 'double-right';
    let doubleLeft = btnName === 'double-left';
    let numbersLeft = lastPageNumber - activeNumber;

    if (doubleRight) {
      if (pagePosition <= 3) {
        console.log('here');
        setPagePosition(4);
        setSlicedpage(3);
        setActiveNumber(7);
      } else if (numbersLeft > 6) {
        setPagePosition(4);
        setSlicedpage(slicedPages + 3);
        setActiveNumber(activeNumber + 3);
      } else if (numbersLeft === 6) {
        setPagePosition(4);
        setSlicedpage(slicedPages + 2);
        setActiveNumber(activeNumber + 2);
      } else if (numbersLeft === 5) {
        setPagePosition(4);
        setSlicedpage(slicedPages + 1);
        setActiveNumber(activeNumber + 1);
      }
      return;
    } else if (doubleLeft) {
      if (pagePosition > 4) {
        setPagePosition(4);
        setActiveNumber(lastPageNumber - 6);
        setSlicedpage(lastPageNumber - 10);
      } else if (activeNumber > 7) {
        setPagePosition(4);
        setSlicedpage(slicedPages - 3);
        setActiveNumber(activeNumber - 3);
      } else if (activeNumber === 7) {
        setPagePosition(4);
        setSlicedpage(slicedPages - 2);
        setActiveNumber(activeNumber - 2);
      } else if (activeNumber === 6) {
        setPagePosition(4);
        setSlicedpage(slicedPages - 1);
        setActiveNumber(activeNumber - 1);
      }
    } else if (numberPressed === lastPageNumber) {
      setPagePosition(8);
      setActiveNumber(lastPageNumber);
      setSlicedpage(lastPageNumber - 8);
    } else if (lastPageNumber - numberPressed <= 3) {
      setActiveNumber(numberPressed);
      setPagePosition(8 - (lastPageNumber - numberPressed));
      setSlicedpage(lastPageNumber - 8);
    } else if (numberPressed > 5) {
      setPagePosition(4);
      setActiveNumber(numberPressed);
      setSlicedpage(numberPressed - 4);
    } else {
      setPagePosition(numberPressed - 1);
      setActiveNumber(numberPressed);
      setSlicedpage(1);
    }
  };
  const handleNavigationClicked = (e: any) => {
    const lastPageNumber = arrayPages[arrayPages.length - 1];
    const direction = e.target.name;
    const pagesLeftEnd = lastPageNumber - activeNumber;
    const pagesLeftStart = activeNumber - 1;

    if (pagesLeftEnd <= 4 && direction === 'next') {
      if (lastPageNumber === activeNumber) return;
      setPagePosition(pagePosition + 1);
      setActiveNumber(activeNumber + 1);
    } else if (pagesLeftStart <= 4 && direction === 'previous') {
      if (activeNumber === 1) return;
      setPagePosition(pagePosition - 1);
      setActiveNumber(activeNumber - 1);
    } else if (
      direction === 'next' &&
      pagePosition === 4 &&
      pagesLeftEnd >= 4
    ) {
      setActiveNumber(activeNumber + 1);
      setSlicedpage(slicedPages + 1);
    } else if (
      direction === 'previous' &&
      pagePosition === 4 &&
      pagesLeftStart >= 4
    ) {
      setActiveNumber(activeNumber - 1);
      setSlicedpage(slicedPages - 1);
    } else if (direction === 'next' && lastPageNumber !== pagePosition) {
      setPagePosition(pagePosition + 1);
      setActiveNumber(activeNumber + 1);
    } else if (direction == 'previous' && pagePosition > 0) {
      setPagePosition(pagePosition - 1);
      setActiveNumber(activeNumber - 1);
    }
  };

  const MiddleNumbers = () => {
    const lastPageNumber = arrayPages[arrayPages.length - 1];
    const pagesLeftEnd = lastPageNumber - activeNumber;
    const pagesLeftStart = activeNumber - 1;
    const middleNumberArray = arrayPages.slice(1, arrayPages.length - 1);

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
        return number === activeNumber ? styles.active_number : '';
      } else if (pagePosition === 5) {
        return activeNumber === number ? styles.active_number : '';
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
          <MiddleNumbers />
          <ButtonNumber number={arrayPages[arrayPages.length - 1]} />
          <ActivePageLayer
            pagePosition={pagePosition * 4 + pagePosition * 32}
          />
        </Flex>
        <button
          name='next'
          onClick={handleNavigationClicked}
          className={
            activeNumber === arrayPages[arrayPages.length - 1]
              ? styles.button_off
              : ''
          }
        >
          <img src='/chevron-left.svg' alt='Chevron' />
        </button>
      </Flex>
    </Flex>
  );
};

export default Pagenation;
