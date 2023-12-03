import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from '../../axios'
import { useState, useEffect } from 'react';
import config from '../../config.json'

export default function SimpleLineChart() {
  useEffect(()=>{
    const fetchData =async()=>{
      let res=await axios.get(`${config.url}/dashboard/monthlyData`);
      setuData(res.data.budgetArray);
      setpData(res.data.expenseArray);
      setxLabels(res.data.monthArray);
    }
    fetchData();
  },[])
  const [uData, setuData] = useState([0])
  const [pData, setpData] = useState([0])
  const [xLabels, setxLabels] = useState([""])
  return (
    <div>
      <h1>Monthly Data</h1>
      <LineChart
      // width={500}
      height={300}
      series={[
        { data: pData, label: 'expense' },
        { data: uData, label: 'budget' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
    </div>
    
  );
}
