const express = require('express');

const router = express.Router();

const {
    addToCart,
    removeFromCart,
    updateCart,
    getAllCarts,
    deleteAllCarts
} = require('../controllers/shoppingCart')

router.route('/')
    .get(getAllCarts)
    .post(addToCart)
    .delete(deleteAllCarts)

router.route('/:id')
    .put(updateCart)
    .delete(removeFromCart)

module.exports = router;