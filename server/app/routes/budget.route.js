const express = require('express');
const checkTokenExpiration = require('../middlewares/auth');
const budgetController = require('../controllers/budget.controller');

const router = express.Router();

router.post('/', checkTokenExpiration, budgetController.createBudget);
router.get('/', checkTokenExpiration, budgetController.getBudgets);
router.get('/:id', checkTokenExpiration, budgetController.getBudgetById);
router.put('/:id', checkTokenExpiration, budgetController.updateBudget);
router.delete('/:id', checkTokenExpiration, budgetController.deleteBudget);

module.exports = router;
