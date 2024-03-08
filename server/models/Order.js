const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    medications: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
        }
    ],
    userName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Order', OrderSchema);