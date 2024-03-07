const express = require('express');

const router = express.Router();

const {
    getAllMedications,
    updateMedication
} = require('../controllers/medication')

router.route('/')
    .get(getAllMedications)

router.route('/:id')
    .put(updateMedication)

module.exports = router;