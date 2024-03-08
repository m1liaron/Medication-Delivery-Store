const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
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
            // Add any other properties related to medications
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


module.exports = mongoose.model('Order', orderSchema);
