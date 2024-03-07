const Shopcart = require('../models/ShopCart');
const {StatusCodes} = require('http-status-codes');

const getAllCarts = async (req, res) => {
    try{
        const shopCarts = await Shopcart.find()
        res.status(StatusCodes.OK).json(shopCarts)
    } catch (error){
        console.error('Error fetching carts:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}
const addToCart = async (req, res) => {
    try{
        const shopCart = await Shopcart.create(req.body);
        // console.log('Created cart:', shopCart)
        res.status(StatusCodes.CREATED).json(shopCart);
    } catch (error) {
        console.error('Error creating shopcart:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

const removeFromCart = async (req, res) => {
    try{
        const cartId = req.params.id;

        const existingTask = await Shopcart.findById(cartId);

        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await Shopcart.findByIdAndDelete(cartId);

        res.json({ message: 'ShopCart deleted successfully' });
    } catch (error) {
        console.error('Error remove shopCart:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

const updateCart = async (req, res) => {
    try{
        const {
            params: { id }
        } = req;

        const existingTask = await Shopcart.findById(id);

        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        console.log(req.body)

        const updatedCart = await Shopcart.findOneAndUpdate(
            { _id: id},
            req.body,
            { new: true}
        );
        // console.log(updatedCart)

        if (!updatedCart) {
            console.log(`No cart with id ${id}`);
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Cart not found' });
        }

        res.status(StatusCodes.OK).json(updatedCart);
    } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getAllCarts,
    addToCart,
    removeFromCart,
    updateCart
}