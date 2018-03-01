const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    description: String,
    amount: Number,   
    createdAt: {type: Date, default: Date.now}    
});

const Expense = module.exports = mongoose.model('Expense', ExpenseSchema);

module.exports.getAllExpenses = (callback) => {
    Expense.find(callback);
}

module.exports.addExpense = (newExpense, callback) => {
    newExpense.save(callback);
}

module.exports.deleteExpenseById = (id, callback) => {
    let query = { _id: id };
    Expense.remove(query, callback);
}

module.exports.updateExpenseById = (id, updateExpense, callback) => {
    let query = { _id: id };
    Expense.findByIdAndUpdate(query, { $set: updateExpense }, callback);
}