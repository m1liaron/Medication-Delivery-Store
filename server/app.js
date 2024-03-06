require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
app.get("/api", (req, res ) => {
    res.json({"users":['UserOne', 'UserTwo']})
})

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