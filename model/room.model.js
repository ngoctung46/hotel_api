const mongoose = require('mongoose');
const order = require('./order.model');
const customer = require('./customer.model');
const ObjectId = mongoose.Schema.ObjectId;

const RoomSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    type: { type: String, required: true},
    status: { type: String, required: true },
    rate: Number,
    timeStamp: { type: Date, default: Date.now},
    orderId: String,
    customerId: String
});

const Room = module.exports = mongoose.model('Room', RoomSchema);

module.exports.getAllRooms = (callback) => {
    Room.find(callback);
}

module.exports.addRoom = (newRoom, callback) => {
    newRoom.save(callback);
}

module.exports.deleteRoomById = (id, callback) => {
    let query = { _id: id };
    Room.remove(query, callback);
}

module.exports.updateRoomById = (id, updateRoom, callback) => {
    let query = { _id: id };
    Room.findByIdAndUpdate(query, { $set: updateRoom }, callback);
}