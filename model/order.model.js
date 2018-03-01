const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderLineIds: [String],
    customerId: String,
    roomId: String,
    checkInTime: {type: Date, default: Date.now},
    checkOutTime: Date,
    discount: Number,
    adjustment: Number,
    total: Number
});

const Order = module.exports = mongoose.model('Order', OrderSchema);

module.exports.getAllOrders = (callback) => {
    Order.find(callback);
}

module.exports.addOrder = (newOrder, callback) => {
    newOrder.save(callback);
}

module.exports.deleteOrderById = (id, callback) => {
    let query = { _id: id };
    Order.remove(query, callback);
}

module.exports.updateOrderById = (id, updateOrder, callback) => {
    let query = { _id: id };
    Order.findByIdAndUpdate(query, { $set: updateOrder }, callback);
}