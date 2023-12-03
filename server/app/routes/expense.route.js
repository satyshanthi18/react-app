const express = require('express');
const checkTokenExpiration = require('../middlewares/auth');
const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.post('/', checkTokenExpiration, expenseController.createExpense);
router.get('/', checkTokenExpiration, expenseController.getExpenses);
router.get('/:id', checkTokenExpiration, expenseController.getExpenseById);
router.put('/:id', checkTokenExpiration, expenseController.updateExpense);
router.delete('/:id', checkTokenExpiration, expenseController.deleteExpense);

module.exports = router;
