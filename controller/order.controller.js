const express = require('express');
const router = express.Router();
const order = require('../model/order.model');

router.get('/', (req, res) => {
    order.getAllOrders((err, orders) => {
        if(err) {
            res.json({success: false, message: `Failed to load all orders. Error: ${err}`});
        } else {
            res.write(JSON.stringify({ success: true, data: orders }));
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    let newOrder= new order({
        orderLineIds: req.body.orderLineIds,
        customerId: req.body.customerId,
        roomId: req.body.roomId,
        checkInTime: req.body.checkInTime,
        checkOutTime: req.body.checkOutTime,
        discount: req.body.discount,
        adjustment: req.body.adjustment,
        total: req.body.total
        
    });

    order.addOrder(newOrder, (err, order) => {
        if(err){
            res.json({success: false, message: `Failed to add new order. Error: ${err}`});
        } else {
            res.json({success: true, _id: order._id});
        }
    });
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    order.deleteOrderById(id, (err, room) => {
        if(err){
            res.json({success: false, message: `Failed to delete order. Error: ${err}`});
        } else if (room) {
            res.json({success: true, message: `Deleted successfully`});
        } else {
            res.json({success: false});
        }
    });
});

router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let updateOrder = new order ({
        _id: id,
        orderLineIds: req.body.orderLineIds,
        customerId: req.body.customerId,
        roomId: req.body.roomId,
        checkInTime: req.body.checkInTime,
        checkOutTime: req.body.checkOutTime,
        discount: req.body.discount,
        adjustment: req.body.adjustment,
        total: req.body.total
    });
    order.updateOrderById(id, updateOrder, (err, order) => {
        if(err){
            res.json({success: false, message: `Failed to update order. Error: ${err}`});
        } else if (order) {
            res.json({success: true, message: `Updated successfully`});
        } else {
            res.json({success: false});
        }
    })
});

module.exports = router;

