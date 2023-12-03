const express = require('express');
const checkTokenExpiration = require('../middlewares/auth');
const categoryController = require('../controllers/category.controller.js');

const router = express.Router();

router.post('/', checkTokenExpiration, categoryController.createCategory);
router.get('/', checkTokenExpiration, categoryController.getCategories);
router.get('/:id', checkTokenExpiration, categoryController.getCategoryById);
router.put('/:id', checkTokenExpiration, categoryController.updateCategory);
router.delete('/:id', checkTokenExpiration, categoryController.deleteCategory);

module.exports = router;
