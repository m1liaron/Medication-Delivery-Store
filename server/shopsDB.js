require('dotenv').config();
const shopData = require('./shops.json');
const Shop = require('./models/Shop');
const connectDB = require('./db/connect')
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        await Shop.create(shopData);
        console.log('Success!')
        process.exit(0)
    } catch (error){
        console.log(error);
        process.exit(1)
    }
}

start();

// This function add data to mongodb
