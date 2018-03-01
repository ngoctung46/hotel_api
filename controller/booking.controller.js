const express = require('express');
const router = express.Router();
const booking = require('../model/booking.model');

router.get('/', (req, res) => {
    booking.getAllBookings((err, bookings) => {
        if(err) {
            res.json({success: false, message: `Failed to get all bookings`});
        } else {
            res.write(JSON.stringify({ success: true, data: bookings }));
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    let newBooking = new booking({
       customerName: req.body.customerName,
       phoneNumber: req.body.phoneNumber,
       checkInDate: req.body.checkInDate,
       roomType: req.body.roomType,
       note: req.body.note
    });

    booking.addBooking(newBooking, (err, booking) => {
        if(err){
            res.json({success: false, message: `Failed to add new booking. Error: ${err}`});
        } else {
            res.json({success: true, _id: booking._id});
        }
    });
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    booking.deleteBookingById(id, (err, booking) => {
        if(err){
            res.json({success: false, message: `Failed to delete booking. Error: ${err}`});
        } else if (booking) {
            res.json({success: true, message: `Deleted successfully`});
        } else {
            res.json({success: false});
        }
    });
});

module.exports = router;

