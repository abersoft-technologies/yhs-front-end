import React from 'react';

/* Import scss module */
import styles from '../Barchart.module.scss';

/* Imported Elements - Styled Components */
import {
  BarProgressIndicatonNumber,
  BarProgressIndicatonNumberSmall,
} from './BarElements';

/* Imported components */
import { Flex } from '../../../ui/Flex';

/* Imported Interfaces */
import { ICheckedParams } from '../Barchart';

interface IArrayNumbersProgress {
  number: number;
  lastItem: boolean;
  isSmall: boolean;
}
interface IBarProps {
  numbersForBar: IArrayNumbersProgress[];
  labelName: string;
  af_percent: number;
  lia_percent: number;
  employment_percent: number;
  checkedParams: ICheckedParams;
}

const Bar = ({
  numbersForBar,
  labelName,
  af_percent,
  lia_percent,
  employment_percent,
  checkedParams,
}: IBarProps) => {
  const determentHeightOfBar = () => {
    let height = 0;
    checkedParams.letter_of_intent ? (height += 1.5) : height;
    checkedParams.employment ? (height += 1.5) : height;
    checkedParams.internship ? (height += 1.5) : height;
    return `${height}rem`;
  };

  return (
    <>
      <div className={styles.bar_with_label_total_container}>
        <Flex
          direction='row'
          justify='space-between'
          class={styles.bar_label_container}
        >
          <label>{labelName}</label>

          <Flex direction='row' gap='small'>
            <div>{17} Avsiktsförklaringar |</div>
            <div>{17} Anställningar |</div>
            <div>{120} LIA-platser</div>
          </Flex>
        </Flex>

        <div
          className={styles.bar_container}
          style={{ height: determentHeightOfBar() }}
        >
          {checkedParams.letter_of_intent && (
            <section
              style={{ width: `${af_percent}%`, minHeight: "16px"}}
              className={styles.af_bar}
            ></section>
          )}
          {checkedParams.employment && (
            <section
              style={{ width: `${employment_percent}%`, minHeight: "16px" }}
              className={styles.employment_bar}
            ></section>
          )}
          {checkedParams.internship && (
            <section
              style={{ width: `${lia_percent}%`, minHeight: "16px" }}
              className={styles.lia_bar}
            ></section>
          )}

          {numbersForBar.map((item, i) => {
            return (
              <React.Fragment key={i}>
                {!item.isSmall ? (
                  <BarProgressIndicatonNumber
                    key={i}
                    position={item.number}
                    lastItem={item.lastItem}
                  >
                    <label>{item.number}</label>
                  </BarProgressIndicatonNumber>
                ) : (
                  <BarProgressIndicatonNumberSmall
                    key={i}
                    position={item.number}
                    lastItem={item.lastItem}
                  >
                    <label>{item.number}</label>
                  </BarProgressIndicatonNumberSmall>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Bar;
