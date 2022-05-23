import React from 'react';

// import { Chart as ChartJS } from 'chart.js/auto';
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

const LineChart = () => {
  const labels = ['Janurai', 'Februari', 'Mars', 'April', 'Maj', 'Juni'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'AF',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30],
      },
    ],
  };

  return (
    <div className={styles.linechart_analytics_medium}>
      <Line data={data} height={140} />
    </div>
  );
};

export default LineChart;
