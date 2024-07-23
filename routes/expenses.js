const express = require('express');
const { addExpense, getExpense, updateExpense, deleteExpense } = require('../controllers/expensesController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/add', auth , addExpense);
router.get('/get', auth , getExpense);
router.put('/update/:id', auth , updateExpense);
router.delete('/delete/:id', auth , deleteExpense);

module.exports = {
    expenseRoute : router,
}