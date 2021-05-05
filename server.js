'use strict';

const express = require('express');
const cors = require('cors');
const faker = require('faker');
const io = require('socket.io-client');
require('dotenv').config();
const SERVER = process.env.SERVER_URL || 'http://localhost:3000'
const PORT =  process.env.PORT

const socket = io.connect(`${SERVER}/caps`);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/pickup', (req,res) => {
    let packer = req.body || {
        storeName: '1-800-flowerzzzzzz',
        orderId: faker.datatype.uuid(),
        customerName: faker.name.findName(),
        address: faker.address.cityName()
    }
    console.log(packer)
    socket.emit('ready-for-pickup', packer)
    res.status(200).send('your package was scheduled');
})

app.listen(PORT, () => {
    console.log(`API Server up! ${PORT}`)
  });