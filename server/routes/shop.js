const express = require('express');

const router = express.Router();

const {
    getAllShops
} = require('../controllers/shop')

router.route('/').get(getAllShops)


module.exports = router;