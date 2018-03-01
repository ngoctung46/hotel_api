const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const BookingSchema = mongoose.Schema({
    customerName: String,
    phoneNumber: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    roomType: { type: String, required: true },
    note: String,
});

const Booking = module.exports = mongoose.model('Booking', BookingSchema);

module.exports.getAllBookings = (callback) => {
    Booking.find(callback);
}

module.exports.addBooking = (newBooking, callback) => {
    newBooking.save(callback);
}

module.exports.deleteBookingById = (id, callback) => {
    let query = { _id: id };
    Booking.remove(query, callback);
}