import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);
import { Doughnut } from 'react-chartjs-2';

import styles from './Circlechart.module.scss';

const CircleChart = () => {
  const labels = ['Data/IT', 'Samhällsbyggnadtion', 'Ekonomi', 'Teknik'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Avsiktsförklaringar',
        backgroundColor: [
          'rgb(123, 169, 204)',
          'rgb(204, 174, 123)',
          'rgb(123, 204, 182)',
          'rgb(204, 123, 138)',
        ],
        data: [89, 60, 100, 25],
        hoverOffset: 4,
      },
      {
        label: 'Samhällsbyggnadtion',
        backgroundColor: [
          'rgb(123, 169, 204)',
          'rgb(204, 174, 123)',
          'rgb(123, 204, 182)',
          'rgb(204, 123, 138)',
        ],
        data: [419, 310, 120, 85],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 7,
          usePointStyle: true,
          pointStyle: 'circle',
        },
        title: {
          text: 'Data fördelat per branch',
          display: true,
          color: '#363636',
          font: {
            size: 18,
            weight: 500,
          },
        },
      },
    },
    elements: {
      arc: {
        weight: 0.5,
        borderWidth: 3,
      },
    },
    cutout: 80,
  };

  return (
    <div className={styles.circlechart_analytics_medium}>
      {/* <span>Data fördelat per branch</span> */}
      <Doughnut data={data} height={300} width={300} options={options} />
    </div>
  );
};

export default CircleChart;
