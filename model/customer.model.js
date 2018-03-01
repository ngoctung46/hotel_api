const mongoose = require('mongoose');
const order = require('./order.model');
const ObjectId = mongoose.Schema.ObjectId;

const CustomerSchema = mongoose.Schema({
    identity: {type: String, require: true},
    name: { type: String, required: true },
    birthDate: Date,
    birthPlace: String,
    issueDate: Date,
    expiryDate: Date,
    issuePlace: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    country: String,
    checkInDate: Date,
    checkOutDate: Date,   
    timeStamp: { type: Date, default: Date.now},
    orderId: String
});

const Customer = module.exports = mongoose.model('Customer', CustomerSchema);

module.exports.getAllCustomers = (callback) => {
    Customer.find(callback);
}

module.exports.addCustomer = (newCustomer, callback) => {
    newCustomer.save(callback);
}

module.exports.deleteCustomerById = (id, callback) => {
    let query = { _id: id };
    Customer.remove(query, callback);
}

module.exports.updateCustomerById = (id, updateCustomer, callback) => {
    let query = { _id: id };
    Customer.findByIdAndUpdate(query, { $set: updateCustomer }, callback);
}