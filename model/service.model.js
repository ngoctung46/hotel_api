const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    name: {type: String, require: true},
    description: String,
    unitInStock: Number,
    currentPrice: Number,
    costPrice: Number,
    isRoomRate: Boolean    
});

const Service = module.exports = mongoose.model('Service', ServiceSchema);

module.exports.getAllServices = (callback) => {
    Service.find(callback);
}

module.exports.addService = (newService, callback) => {
    newService.save(callback);
}

module.exports.deleteServiceById = (id, callback) => {
    let query = { _id: id };
    Service.remove(query, callback);
}

module.exports.updateServiceById = (id, updateService, callback) => {
    let query = { _id: id };
    Service.findByIdAndUpdate(query, { $set: updateService }, callback);
}