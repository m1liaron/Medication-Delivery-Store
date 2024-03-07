const Shop = require('../models/Shop');
const {StatusCodes} = require('http-status-codes');

const getAllShops = async (req, res) => {
    try{
        const shops = await Shop.find()
        res.status(StatusCodes.OK).json(shops)
    } catch (error){
        console.error('Error fetching tasks:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllShops,
}