const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const roomController = require('./controller/room.controller'); 
const customerController = require('./controller/customer.controller');
const serviceController = require('./controller/service.controller');
const orderlineController = require('./controller/orderline.controller');
const orderController = require('./controller/order.controller');
const expenseController = require('./controller/expense.controller');
const bookingController = require('./controller/booking.controller');

// Connect mongoose to db
mongoose.connect(config.database, { useMongoClient: true });

// Initialize our app variable
const app = express();

// Declaring port
const port = process.env.PORT || 3000;

// Middle ware for CORS
app.use(cors());

// Middle ware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Invalid Page');
})

app.use('/api/room/', roomController);
app.use('/api/customer/', customerController);
app.use('/api/service/', serviceController);
app.use('/api/orderline/', orderlineController);
app.use('/api/order/', orderController);
app.use('/api/expense/', expenseController);
app.use('/api/booking/', bookingController);
// app.use('**', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

// Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${ port }`);
});