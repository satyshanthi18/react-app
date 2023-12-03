const express = require('express');
const checkTokenExpiration = require('../middlewares/auth');
const salaryController = require('../controllers/salary.controller');

const router = express.Router();

router.post('/', checkTokenExpiration, salaryController.createSalary);
router.get('/', checkTokenExpiration, salaryController.getSalaries);
router.get('/:id', checkTokenExpiration, salaryController.getSalaryById);
router.put('/:id', checkTokenExpiration, salaryController.updateSalary);
router.delete('/:id', checkTokenExpiration, salaryController.deleteSalary);

module.exports = router;
