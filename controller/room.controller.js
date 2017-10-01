const express = require('express');
const router = express.Router();
const room = require('../model/room.model');

router.get('/', (req, res) => {
    room.getAllRooms((err, rooms) => {
        if(err) {
            res.json({success: false, message: `Failed to load all rooms. Error: ${err}`});
        } else {
            res.write(JSON.stringify({ success: true, data: rooms }));
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    let newRoom = new room({
        name: req.body.name,
        description: req.body.description,
        rate: req.body.rate,
        type: req.body.type,
        status: req.body.status,
        orderId: req.body.orderId,
        customerId: req.body.customerId
    });

    room.addRoom(newRoom, (err, room) => {
        if(err){
            res.json({success: false, message: `Failed to add new room. Error: ${err}`});
        } else {
            res.json({success: true, message: `Added new room successfully`});
        }
    });
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    room.deleteRoomById(id, (err, room) => {
        if(err){
            res.json({success: false, message: `Failed to delete room. Error: ${err}`});
        } else if (room) {
            res.json({success: true, message: `Deleted successfully`});
        } else {
            res.json({success: false});
        }
    });
});

router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let updateRoom = new room ({
        _id: id,
        name: req.body.name,
        description: req.body.description,
        rate: req.body.rate,
        type: req.body.type,
        status: req.body.status,
        orderId: req.body.orderId,
        customerId: req.body.customerId
    });
    room.updateRoomById(id, updateRoom, (err, room) => {
        if(err){
            res.json({success: false, message: `Failed to update room. Error: ${err}`});
        } else if (room) {
            res.json({success: true, message: `Updated successfully`});
        } else {
            res.json({success: false});
        }
    })
});

module.exports = router;

