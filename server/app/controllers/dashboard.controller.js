// dashboard.controller.js

const Expense = require('../models/expense');
const Budget = require('../models/budget');

const formatChartData = (data) => {
    return data.map((item, index) => ({
      id: index,
      value: item.amount, 
      label: item.category
    }));
  };
  const formatExpenseData = (data) => {
    return data.map((item, index) => ({
      id: index,
      value: item.amount, 
      label: item.description
    }));
  };

const getExpenses = async (req, res) => {
    try {
      const { month, year } = req.query;
      const user = req.user._id;
      const expenses = await Expense.find({ month, year, user }); 
      const formattedExpenses = formatExpenseData(expenses);
      res.json(formattedExpenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getBudget = async (req, res) => {
    try {
      const { month, year } = req.query;
      const user = req.user._id;
      // const budget = await Budget.find({ month, year,user });
      const budget = await Budget.find({ user });
      const formattedBudget = formatChartData(budget);
      res.json(formattedBudget);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  function calculateTotal(category, expenses, budgets) {
    const totalExpense = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
  
    const totalBudget = budgets
      .filter((budget) => budget.category === category)
      .reduce((sum, budget) => sum + budget.amount, 0);
  
    return {
      category,
      expense: totalExpense,
      budget: totalBudget
    };
  }

  const getBudgetVsExpenses = async (req, res) => {
    try {
      
      const { month, year } = req.query;
      const user = req.user._id;
      
      const expense = await Expense.find({ month, year,user });
      const budget = await Budget.find({  user });
      const uniqueCategories = [...new Set([...expense?.map((item) => item.category), ...budget.map((item) => item.category)])];
      let result = uniqueCategories.map((category) => calculateTotal(category, expense, budget));
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: 'Internal Server Error' });
    }
  };
  const getTotal = async (req, res) => {
    try {
      const { month, year } = req.query;
      const user = req.user._id;
      const expense = await Expense.find({ month, year,user });
      const budget = await Budget.find({  user });
      let totalBudget = 0, totalExpense=0;
      expense.map(e=>totalExpense+=e.amount)
      budget.map(b=>totalBudget+=b.amount)
      let result=[
        {"id":0,"value":totalBudget,"label":"Total Budget"},
        {"id":1,"value":totalExpense,"label":"Total Expenses"}
      ]
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const monthlyData = async (req, res) => {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so add 1
      const currentYear = currentDate.getFullYear();
  
      const monthsToSubtract = 5;
      const startMonth =
        currentMonth - monthsToSubtract <= 0
          ? 12 + (currentMonth - monthsToSubtract)
          : currentMonth - monthsToSubtract;
      const startYear =
        currentMonth - monthsToSubtract <= 0
          ? currentYear - 1
          : currentYear;
  
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const budgetArray = [];
      const expenseArray = [];
      const monthArray = [];
  
      for (let i = 0; i < 6; i++) {
        const currentMonthIndex = (startMonth + i - 1) % 12;
        const currentYear =
          startMonth + i <= 12 ? startYear : startYear + Math.floor((startMonth + i - 1) / 12);
  
        // let budget = await Budget.find({ month: currentMonthIndex + 1, year: currentYear });
        let budget = await Budget.find({});
        let expenses = await Expense.find({ month: currentMonthIndex + 1, year: currentYear });
  
        let totalBudget = budget.reduce((acc, curr) => acc + curr.amount, 0);
        let totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        budgetArray.push(totalBudget);
        expenseArray.push(totalExpense);
        monthArray.push(months[currentMonthIndex] + ', ' + currentYear);
      }
  
      res.status(200).json({ budgetArray, expenseArray, monthArray });
    } catch (error) {
      console.error('Error in monthlyData:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = {
  getExpenses,
  getBudget,
  getBudgetVsExpenses,
  getTotal,
  monthlyData
};
