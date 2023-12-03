// expenses.routes.js

const express = require('express');
const checkTokenExpiration = require('../middlewares/auth');
const dashboardController = require('../controllers/dashboard.controller.js');

const router = express.Router();

router.get('/expenses', checkTokenExpiration, dashboardController.getExpenses);
router.get('/budget', checkTokenExpiration, dashboardController.getBudget);
router.get('/budgetVSExpenses', checkTokenExpiration, dashboardController.getBudgetVsExpenses);
router.get('/total', checkTokenExpiration, dashboardController.getTotal);
router.get('/monthlyData', checkTokenExpiration, dashboardController.monthlyData)
module.exports = router;
