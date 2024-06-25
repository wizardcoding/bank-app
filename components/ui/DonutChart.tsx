'use client'

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


const DonutChart = (props: DoughnutChartProps) => {
  const { accounts } = props;
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [
      'Bank 1',
      'Bank 2',
      'Bank 3'
    ],
    datasets: [{
      label: 'Banks',
      data: [1234, 500, 340],
      backgroundColor: [
        '#0747B6',
        '#2265D8',
        '#2F91FA'
      ]
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
  };
  
  return (
    <Doughnut data={data} 
      options={{
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          }
        }
      }}/>
  )
}

export default DonutChart;
