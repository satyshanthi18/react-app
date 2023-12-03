const DefaultBudget = require('../models/defaultBudget')
const createBudget = async (req, res) => {
    try {
      const { category, amount } = req.body;
      const user = req.user._id;
      const newBudget = new DefaultBudget({ user, category, amount });
  
      await newBudget.save();
  
      res.status(201).json(newBudget);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getBudgets = async (req, res) => {
    try {
      const budgets = await DefaultBudget.find({user:req.user._id});
      res.status(200).json(budgets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getBudgetById = async (req, res) => {
    try {
      const budget = await DefaultBudget.findById(req.params.id);
      if (!budget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
      res.status(200).json(budget);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const updateBudget = async (req, res) => {
    try {
      const { user, category, amount } = req.body;
  
      const updatedBudget = await DefaultBudget.findByIdAndUpdate(
        req.params.id,
        { user, category, amount },
        { new: true }
      );
  
      if (!updatedBudget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
  
      res.status(200).json(updatedBudget);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const deleteBudget = async (req, res) => {
    try {
      const deletedBudget = await DefaultBudget.findByIdAndRemove(req.params.id);
  
      if (!deletedBudget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
  
      res.status(204).json({ message: 'Budget deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
  };
  