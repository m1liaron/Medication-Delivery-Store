require('dotenv').config();
const medicationsData = require('./medications.json');
const Medication = require('./models/Medication');
const connectDB = require('./db/connect')
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        await Medication.create(medicationsData);
        console.log('Success!')
        process.exit(0)
    } catch (error){
        console.log(error);
        process.exit(1)
    }
}

start();

// This function add data to mongodb