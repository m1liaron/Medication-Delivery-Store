const mongoose = require('mongoose');

const ShopCartScheme = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true,
        default: 1
    },
    img:{
        type: 'String'
    }
})

module.exports = mongoose.model('ShopCart', ShopCartScheme);