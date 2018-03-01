const express = require('express');
const router = express.Router();
const orderline = require('../model/orderline.model');

router.get('/', (req, res) => {
    orderline.getAllOrderLines((err, orderlines) => {
        if(err) {
            res.json({success: false, message: `Failed to load all orderlines. Error: ${err}`});
        } else {
            res.write(JSON.stringify({ success: true, data: orderlines }));
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    let newOrderline= new orderline({
        name: req.body.name,
        serviceId: req.body.serviceId,
        orderId: req.body.orderId,
        quantity: req.body.quantity,
        price: req.body.price,
        serviceName: req.body.serviceName,
        total: req.body.total
    });

    orderline.addOrderLine(newOrderline, (err, orderline) => {
        if(err){
            res.json({success: false, message: `Failed to add new orderline. Error: ${err}`});
        } else {
            res.json({success: true, _id: orderline._id});
        }
    });
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    orderline.deleteOrderLineById(id, (err, room) => {
        if(err){
            res.json({success: false, message: `Failed to delete orderline. Error: ${err}`});
        } else if (room) {
            res.json({success: true, message: `Deleted successfully`});
        } else {
            res.json({success: false});
        }
    });
});

router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let updateOrderline = new orderline ({
        _id: id,
        name: req.body.name,
        serviceId: req.body.serviceId,
        orderId: req.body.orderId,
        quantity: req.body.quantity,
        price: req.body.price,
        serviceName: req.body.serviceName,
        total: req.body.total
    });
    orderline.updateOrderLineById(id, updateService, (err, orderline) => {
        if(err){
            res.json({success: false, message: `Failed to update orderline. Error: ${err}`});
        } else if (orderline) {
            res.json({success: true, message: `Updated successfully`});
        } else {
            res.json({success: false});
        }
    })
});

module.exports = router;

