const express = require('express');

const router = express.Router();

const {
    createOrder, getAllOrders
} = require('../controllers/order')

router.route('/').post(createOrder).get(getAllOrders);

module.exports = router;