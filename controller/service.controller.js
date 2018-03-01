const express = require('express');
const router = express.Router();
const service = require('../model/service.model');

router.get('/', (req, res) => {
    service.getAllServices((err, services) => {
        if(err) {
            res.json({success: false, message: `Failed to load all services. Error: ${err}`});
        } else {
            res.write(JSON.stringify({ success: true, data: services }));
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    let newService= new service({
        name: req.body.name,
        description: req.body.description,
        unitInStock: req.body.unitInStock,
        currentPrice: req.body.currentPrice,
        costPrice: req.body.costPrice,
        isRoomRate: req.body.isRoomRate
    });

    service.addService(newService, (err, service) => {
        if(err){
            res.json({success: false, message: `Failed to add new service. Error: ${err}`});
        } else {
            res.json({success: true, _id: service._id});
        }
    });
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    service.deleteServiceById(id, (err, room) => {
        if(err){
            res.json({success: false, message: `Failed to delete service. Error: ${err}`});
        } else if (room) {
            res.json({success: true, message: `Deleted successfully`});
        } else {
            res.json({success: false});
        }
    });
});

router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let updateService = new service ({
        _id: id,
        name: req.body.name,
        description: req.body.description,
        unitInStock: req.body.unitInStock,
        currentPrice: req.body.currentPrice,
        costPrice: req.body.costPrice,
        isRoomRate: req.body.isRoomRate
    });
    service.updateServiceById(id, updateService, (err, service) => {
        if(err){
            res.json({success: false, message: `Failed to update service. Error: ${err}`});
        } else if (service) {
            res.json({success: true, message: `Updated successfully`});
        } else {
            res.json({success: false});
        }
    })
});

module.exports = router;

