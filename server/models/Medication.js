const mongoose = require('mongoose');

const MedicationScheme = new mongoose.Schema({
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
    shop:{
        type: 'String',
        required: true
    }
})

module.exports = mongoose.model('Medication', MedicationScheme);