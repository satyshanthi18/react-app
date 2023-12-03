import MonthYearDropdowns from "../MonthFilter";
import BarsDataset from "./BarChart1";
import PieActiveArc from "./BudgetPieChart";
import ExpensPieChart from './ExpensePieChart'
import TotalSpendChart from './TotalSpendDonutChart'
import TotalPieChart from './TotalSpend'
import SimpleLineChart from "./MonthlyLineChart";
import { useState } from "react";
import "./dashboard.css";
const AdminView = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  return (
    <div>
      <MonthYearDropdowns
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
      
     
      <div className="admin">
        <PieActiveArc
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
      <div className="admin">
        <ExpensPieChart
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
      <div className="admin">
        <TotalPieChart
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
      <div className="admin">
        <BarsDataset
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
      <div className="admin">
        <SimpleLineChart
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>

      {/* <div className="admin">
        <TotalSpendChart
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div> */}
    </div>
  );
};

export default AdminView;
