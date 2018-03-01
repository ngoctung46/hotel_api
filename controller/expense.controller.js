const express = require('express');
const router = express.Router();
const expense = require('../model/expense.model');

router.get('/', (req, res) => {
    expense.getAllExpenses((err, expenses) => {
        if(err) {
            res.json({success: false, message: `Failed to load all expenses. Error: ${err}`});
        } else {
            res.write(JSON.stringify({ success: true, data: expenses }));
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    let newExpense= new expense({
        description: req.body.description,
        amount: req.body.amount,
        createdAt: req.body.createdAt        
    });

    expense.addExpense(newExpense, (err, expense) => {
        if(err){
            res.json({success: false, message: `Failed to add new expense. Error: ${err}`});
        } else {
            res.json({success: true, _id: expense._id});
        }
    });
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    expense.deleteExpenseById(id, (err, expense) => {
        if(err){
            res.json({success: false, message: `Failed to delete expense. Error: ${err}`});
        } else if (expense) {
            res.json({success: true, message: `Deleted successfully`});
        } else {
            res.json({success: false});
        }
    });
});

router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let updateExpense = new expense ({
        _id: id,
        description: req.body.description,
        amount: req.body.amount,
        createdAt: req.body.createdAt
    });
    expense.updateExpenseById(id, updateExpense, (err, expense) => {
        if(err){
            res.json({success: false, message: `Failed to expense order. Error: ${err}`});
        } else if (order) {
            res.json({success: true, message: `Updated successfully`});
        } else {
            res.json({success: false});
        }
    })
});

module.exports = router;

