'use client'

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const DonutChart = (props: DoughnutChartProps) => {
  const { accounts } = props;
  ChartJS.register(ArcElement, Tooltip, Legend);

  const setColorChart = (balance: number) => {
    if(balance < 1) {

      return '#000';
    } else if(balance < 500) {

      return '#2F91FA'
    } else if(balance > 1000) {

      return '#0747B6';
    } else {

      return '#2265D8';
    }
  }

  const accoutData = accounts.reduce((previousValue, currentValue) => {
    previousValue.labels = [...previousValue.labels, currentValue.name];
    previousValue.datasets[0].data = [...previousValue.datasets[0].data, currentValue.currentBalance];
    previousValue.datasets[0].backgroundColor = [...previousValue.datasets[0].backgroundColor, setColorChart(currentValue.currentBalance)];

    return previousValue;
  }, {
    labels: [] as string[], 
    datasets: [{
      label: 'Balance',
      data: [],
      backgroundColor: []
    }] as any[]
  });

  console.log('accoutData', accoutData);

  // const data = {
  //   labels: [
  //     'Bank 1',
  //     'Bank 2',
  //     'Bank 3'
  //   ],
  //   datasets: [{
  //     label: 'Banks',
  //     data: [1234, 500, 340],
  //     backgroundColor: [
  //       '#0747B6',
  //       '#2265D8',
  //       '#2F91FA'
  //     ]
  //   }]
  // };

  // const config = {
  //   type: 'doughnut',
  //   data: data,
  // };
  
  return (
    <Doughnut data={accoutData} 
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
