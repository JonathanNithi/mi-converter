import React from 'react'
import { Line } from 'react-chartjs-2'
import '../LineChart.css'
import Table from './Table'

import {
    Chart as ChartJS,
    LineElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js'

ChartJS.register(
    LineElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement
)



const LineChart = ({data}) => {
    
    const exchangeData = [];
    const timestamp = Object.keys(data?.data);

    
    for (let i = 0; i < timestamp.length; i += 1) {
        exchangeData.push((Object.values(data?.data[timestamp[i]]))[0]);
    }
    
      const dataset = {
        labels: timestamp,
        datasets: [
          {
            label: 'Exchange Rate',
            data: exchangeData,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
      const options = {
        yAxis: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
      };

    const tableData = []
    if(timestamp!= null && exchangeData!= null){
        for (let index = 0; index < timestamp.length; index++) {
             tableData[index] = {id:index+1, "Date": timestamp[index], "Exchange Rate": exchangeData[index]}  
        }
    }
    

  return (
    <>
    <div className='chartstyle'>
      <Line data={dataset} options={options}/>
    </div>
    <div className='chartstyle table'>
    <Table tableData={tableData}/>
    </div>
    </>
  )
}

export default LineChart