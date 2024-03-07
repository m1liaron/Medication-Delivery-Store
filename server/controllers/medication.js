const Medication = require('../models/Medication');
const {StatusCodes} = require('http-status-codes');

const getAllMedications = async (req, res) => {
    try{
        const medications = await Medication.find()
        res.status(StatusCodes.OK).json({medications})
    } catch (error){
        console.error('Error fetching tasks:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

const updateMedication = async (req, res) => {
    const {
        body: {amount},
        params: {id}
    } = req;
    try{

        const updatedMedication = await Medication.findOneAndUpdate(
            { _id: id },
            { amount },
            { new: true } // Return the modified document
        );

        // console.log(`Updated medication: ${updatedMedication}`)
        if (!updatedMedication) {
            console.log(`No task with id ${id} in project ${id}`);
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Task not found' });
        }

        res.status(StatusCodes.OK).json(updatedMedication);
    } catch (error){
        console.error('Error updating task:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllMedications,
    updateMedication
}