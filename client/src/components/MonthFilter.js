import React, { useState, useEffect } from 'react';
import './monthFilter.css'
const MonthYearDropdowns = ({selectedMonth,selectedYear,setSelectedMonth,setSelectedYear}) => {
 
  const currentMonth = new Date().getMonth(); // Months are zero-indexed
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setSelectedMonth((currentMonth+1));
    setSelectedYear(currentYear);
  }, []);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const allMonths = monthNames;

  const years = [currentYear, currentYear - 1].map((year) => year);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  return (
    <div className="dropdown-container">
      <select
        id="months"
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        {allMonths.map((month, index) => (
          <option key={month} value={(index + 1).toString()}>
            {month}
          </option>
        ))}
      </select>

      
      <select
        id="years"
        value={selectedYear}
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthYearDropdowns;
