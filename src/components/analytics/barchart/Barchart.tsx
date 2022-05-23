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
  BarElement,
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
  BarElement
);
import { Bar } from 'react-chartjs-2';

import styles from './Barchart.module.scss';

const labels = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni'];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Anställningar',
      backgroundColor: 'rgb(123, 204, 182)',
      data: [25, 58, 15, 20, 40, 70, 45],
      borderRadius: 30,
      barThickness: 10,
    },
    {
      label: 'LIA-Platser',
      backgroundColor: 'rgb(123, 169, 204)',
      data: [45, 10, 25, 60, 20, 30, 45],
      borderRadius: 30,
      barThickness: 10,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: 'top',
      align: 'center',
      labels: {
        boxWidth: 7,
        usePointStyle: true,
        pointStyle: 'circle',
      },
      title: {
        text: 'Anst. & LIA per månad',
        display: true,
        color: '#363636',
        font: {
          size: 18,
          weight: 500,
        },
      },
    },
  },

  BarElement: {
    bar: {
      barPercentage: 0.3,
      categoryPercentage: 0.6,
    },
  },

  scales: {
    yAxis: {
      max: 100,
    },
  },
};

const Barchart = () => {
  return (
    <div className={styles.barchart_analytics_medium}>
      <Bar data={data} height={300} options={options} />
    </div>
  );
};

export default Barchart;
