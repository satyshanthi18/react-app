const express = require('express');
const router = express.Router();
const Salary = require('../models/salary');

const createSalary = async (req, res) => {
    try {
      const { user, amount, month, year } = req.body;
  
      const newSalary = new Salary({ user, amount, month, year });
  
      await newSalary.save();
  
      res.status(201).json(newSalary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getSalaries = async (req, res) => {
    try {
      const salaries = await Salary.find();
      res.status(200).json(salaries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getSalaryById = async (req, res) => {
    try {
      const salary = await Salary.findById(req.params.id);
      if (!salary) {
        return res.status(404).json({ message: 'Salary not found' });
      }
      res.status(200).json(salary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const updateSalary = async (req, res) => {
    try {
      const { user, amount, month, year } = req.body;
  
      const updatedSalary = await Salary.findByIdAndUpdate(
        req.params.id,
        { user, amount, month, year },
        { new: true }
      );
  
      if (!updatedSalary) {
        return res.status(404).json({ message: 'Salary not found' });
      }
  
      res.status(200).json(updatedSalary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const deleteSalary = async (req, res) => {
    try {
      const deletedSalary = await Salary.findByIdAndRemove(req.params.id);
  
      if (!deletedSalary) {
        return res.status(404).json({ message: 'Salary not found' });
      }
  
      res.status(204).json({ message: 'Salary deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    createSalary,
    getSalaries,
    getSalaryById,
    updateSalary,
    deleteSalary,
  };
  