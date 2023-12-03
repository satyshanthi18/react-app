const Expense = require('../models/expense')
const createExpense = async (req, res) => {
    try {
      const {  description, amount, month, year, category } = req.body;
      const user = req.user._id;
      const newExpense = new Expense({ user, description,category, amount, month, year });
      console.log(user,newExpense)
      await newExpense.save();
  
      res.status(201).json(newExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getExpenses = async (req, res) => {
    try {
      let expenses
      if(req.query.month!==undefined&& req.query.year!==undefined)
      {
        expenses = await Expense.find({year:req.query.year,month:req.query.month, user:req.user._id});
      }
      else
      {
        expenses = await Expense.find({user:req.user._id});
      }
       
      res.status(200).json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getExpenseById = async (req, res) => {
    try {
      const expense = await Expense.findById(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      res.status(200).json(expense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const updateExpense = async (req, res) => {
    try {
      const { user, description, amount, month, year } = req.body;
      
      const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        { user, description, amount, month, year },
        { new: true }
      );
      console.log(updateExpense, user,description,amount)
  
      if (!updatedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.status(200).json(updatedExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const deleteExpense = async (req, res) => {
    try {
      const deletedExpense = await Expense.findByIdAndRemove(req.params.id);
  
      if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.status(204).json({ message: 'Expense deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
  };
  