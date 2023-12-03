import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { useState, useEffect } from 'react';
import axios from '../../axios';
import config from '../../config.json'
const chartSetting = {
  yAxis: [
    {
      label: 'amount ($)',
    },
  ],
  // width: 700,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};




const valueFormatter = (value) => `$${value}`;

export default function BarsDataset({selectedMonth, selectedYear}) {
  const [dataset1,setDataset]=useState([
    { category: '', expense: 0, budget: 0 },
   
  ]) 
  console.log("dataset1", dataset1)
  useEffect(()=>{
    const fetchData=async()=>{
      let res = await axios.get(`${config.url}/dashboard/budgetVSExpenses?month=${selectedMonth}&year=${selectedYear}`)
      console.log(res.data[0])
      if(res.data[0])
      {
        setDataset(res.data)
        console.log(res.data)
      }
      else
      {
        setDataset([
          { category: '', expense: 0, budget: 0 },
         
        ])
        console.log("else",res.data)
      }

    }
    fetchData()
  },[selectedMonth,selectedYear])
  return (
    <BarChart
      dataset={dataset1}
      xAxis={[{ scaleType: 'band', dataKey: 'category' }]}
      series={[
        { dataKey: 'budget', label: 'Budget', valueFormatter },
        { dataKey: 'expense', label: 'Expense', valueFormatter },
        
      ]}
      {...chartSetting}
    />
  );
}