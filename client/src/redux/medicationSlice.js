import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shops from '../mock-data.json';
import axios from "axios";

export const fetchMedication = createAsyncThunk('medication/fetchShops', async () => {
    try {
        const response = await fetch('https://medication-delivery-store.onrender.com/medications');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
});

export const updateMedicationDb = createAsyncThunk('medication/update', async({id, amount, isFavorite = false}) => {
    try {
        console.log('Тепер робимо запит щоб оновити ліки')
        const response = await axios.put(`https://medication-delivery-store.onrender.com/medications/${id}`, {amount, isFavorite});
        console.log('Ось оновлені ліки', response.data)
        return response.data;  // Make sure the server returns the updated cart
    } catch (error){
        console.error('Error updating medication amount:', error);
        throw error;
    }
})

const medicationSlice = createSlice({
    name: 'medications',
    initialState: {
        medications: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        updateIsFavorite:(state, action) => {
            const { _id, isFavorite } = action.payload;
            const itemToUpdate = state.medications.medications.find(item => item._id === _id);

            if (itemToUpdate) {
                itemToUpdate.isFavorite = isFavorite;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedication.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMedication.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.medications = action.payload; // Corrected from state.cards to state.shops
            })
            .addCase(fetchMedication.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateMedicationDb.fulfilled, (state, action) => {
                const { _id, amount } = action.payload;
                const itemToUpdate = state.medications.medications.find(item => item._id === _id);

                if (itemToUpdate) {
                    itemToUpdate.amount = amount;
                }
            })
    },
});

export const {updateIsFavorite} = medicationSlice.actions;

export const selectMedication = (state) => state.medications.medications;

export const medicationReducers = medicationSlice.reducer;
