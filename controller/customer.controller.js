const express = require('express');
const router = express.Router();
const customer = require('../model/customer.model');

router.get('/', (req, res) => {
    customer.getAllCustomers((err, customers) => {
        if(err) {
            res.json({success: false, message: `Failed to load all customers. Error: ${err}`});
        } else {
            res.write(JSON.stringify({ success: true, data: customers }));
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    console.log("POST");
    let newCustomer = new customer({
        identity: req.body.identity,
        name: req.body.name,
        birthDate: req.body.birthDate,
        birthPlace: req.body.birthPlace,
        issueDate: req.body.issueDate,
        expiryDate: req.body.expiryDate,
        issuePlace: req.body.issuePlace,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        country: req.body.country,
    });

    customer.addCustomer(newCustomer, (err, customer) => {
        if(err){
            res.json({success: false, message: `Failed to add new customer. Error: ${err}`});
        } else {
            res.json({success: true, message: `Added new customer successfully`});
        }
    });
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    customer.deleteCustomerById(id, (err, room) => {
        if(err){
            res.json({success: false, message: `Failed to delete customer. Error: ${err}`});
        } else if (room) {
            res.json({success: true, message: `Deleted successfully`});
        } else {
            res.json({success: false});
        }
    });
});

router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let updateCustomer = new customer ({
        _id: id,
        identity: req.body.identity,
        name: req.body.name,
        birthDate: req.body.birthDate,
        birthPlace: req.body.birthPlace,
        issueDate: req.body.issueDate,
        expiryDate: req.body.expiryDate,
        issuePlace: req.body.issuePlace,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        country: req.body.country
    });
    customer.updateCustomerById(id, updateCustomer, (err, customer) => {
        if(err){
            res.json({success: false, message: `Failed to update customer. Error: ${err}`});
        } else if (room) {
            res.json({success: true, message: `Updated successfully`});
        } else {
            res.json({success: false});
        }
    })
});

module.exports = router;

