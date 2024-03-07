const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    medications: [
        {
            medication: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Medication',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    customerName: String,
});


module.exports = mongoose.model('Order', orderSchema);