require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
app.get("/api", (req, res ) => {
    res.json({"users":['UserOne', 'UserTwo']})
})
const shopRouter = require('./routes/shop');
const medicationRouter = require('./routes/medications')
const shoppingCart = require('./routes/shoppingCart')

app.use(express.json());
app.use('/shops',shopRouter)
app.use('/medications', medicationRouter);
app.use('/shopcarts', shoppingCart);

const start = async () => {
    try{
    await connectDB(process.env.MONGO_URI);
        app.listen(5000, () => {
            console.log('The server is running on port 5000...')
        })
    } catch (error){
        console.error('Error starting the server:', error);
    }
}

start()