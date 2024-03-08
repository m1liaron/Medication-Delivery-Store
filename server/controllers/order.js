const Shop = require('../models/Shop');
const {StatusCodes} = require('http-status-codes');
const Order= require("../models/Order");

const createOrder = async (req, res) => {
    try{
        const order = await Order.create(req.body);
        // console.log('Created cart:', shopCart)
        res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
        console.error('Error creating shopcart:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createOrder
}
