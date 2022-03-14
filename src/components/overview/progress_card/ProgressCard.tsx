import React, { useState } from 'react';

import styles from './Progresscard.module.scss';

interface IWeeklyMonthlyCardProps {
  amount: number;
  type: string;
}

const ProgressCard = () => {
  const [activeInterval, setActiveInterval] = useState({
    week: true,
    month: false,
  });

  let attributesProgArray = [
    { type: 'Avsiktförklaringar', amount: 8 },
    { type: 'Anställningar', amount: 80 },
    { type: 'LIA-platser', amount: 28 },
    { type: 'LG-ledamot', amount: 3 },
  ];
  let attributesProgArrayMoth = [
    { type: 'Avsiktförklaringar', amount: 38 },
    { type: 'Anställningar', amount: 280 },
    { type: 'LIA-platser', amount: 208 },
    { type: 'LG-ledamot', amount: 9 },
  ];

  const DisplayNumbersCard = ({ amount, type }: IWeeklyMonthlyCardProps) => (
    <article>
      <img src='/achievement-icon.svg' alt='Achievement' />
      <div>{type}</div>
      <div>{amount}</div>
    </article>
  );

  return (
    <div className={styles.progress_card_container}>
      <div className={styles.toggle_week_month_container}>
        <button
          type='button'
          onClick={() => setActiveInterval({ week: true, month: false })}
          style={
            activeInterval.week ? { color: '#464646' } : { color: '#c4c4c4' }
          }
        >
          Vecka
        </button>
        <hr />
        <button
          type='button'
          onClick={() => setActiveInterval({ week: false, month: true })}
          style={
            activeInterval.month ? { color: '#464646' } : { color: '#c4c4c4' }
          }
        >
          Månad
        </button>
      </div>
      <section className={styles.attributes_progress_container}>
        {activeInterval.week
          ? attributesProgArray.map(
              (item: IWeeklyMonthlyCardProps, i: number) => {
                return (
                  <DisplayNumbersCard
                    key={i}
                    type={item.type}
                    amount={item.amount}
                  />
                );
              }
            )
          : attributesProgArrayMoth.map(
              (item: IWeeklyMonthlyCardProps, i: number) => {
                return (
                  <DisplayNumbersCard
                    key={i}
                    type={item.type}
                    amount={item.amount}
                  />
                );
              }
            )}
      </section>
    </div>
  );
};

export default ProgressCard;
