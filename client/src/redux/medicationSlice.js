import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shops from '../mock-data.json';
import axios from "axios";

export const fetchMedication = createAsyncThunk('medication/fetchShops', async () => {
    try {
        const response = await fetch('/medications');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
});

export const updateMedication = createAsyncThunk('medication/update', async({id, amount}) => {
    try {
        axios.put(`/medications/${id}`, {amount}).then(response => {
            console.log(response)
            return response
        })
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
    },
});

// export const {} = medicationSlice.actions;

export const selectMedication = (state) => state.medications.medications;

export const medicationReducers = medicationSlice.reducer;
