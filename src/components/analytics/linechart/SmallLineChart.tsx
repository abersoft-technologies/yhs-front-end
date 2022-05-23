import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Filler
);
import { Line } from 'react-chartjs-2';

import styles from './Linechart.module.scss';

const SmallLineChart = () => {
  const labels = ['', '', '', '', '', '', '', '', '', '', '', '', '', ''];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'AF',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 4, 22, 24, 12, 3, 32, 40, 20],
        tension: 0.2,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
  };

  return (
    <div className={styles.linechart_analytics_small}>
      <div>
        <Line data={data} height={140} width={250} options={options} />
      </div>
    </div>
  );
};

export default SmallLineChart;
