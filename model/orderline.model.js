const mongoose = require('mongoose');

const OrderLineSchema = mongoose.Schema({
    serviceId: {type: String, require: true},
    orderId: {type: String, require: true},
    quantity: Number,
    total: Number,
    price: Number,
    serviceName: String    
});

const OrderLine = module.exports = mongoose.model('OrderLine', OrderLineSchema);

module.exports.getAllOrderLines = (callback) => {
    OrderLine.find(callback);
}

module.exports.addOrderLine = (newOrderLine, callback) => {
    newOrderLine.save(callback);
}

module.exports.deleteOrderLineById = (id, callback) => {
    let query = { _id: id };
    OrderLine.remove(query, callback);
}

module.exports.updateOrderLineById = (id, updateOrderLine, callback) => {
    let query = { _id: id };
    OrderLine.findByIdAndUpdate(query, { $set: updateOrderLine }, callback);
}