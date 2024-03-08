import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const onSaveOrder = createAsyncThunk(
    'order/save',
    async (data) => {
        try {
            const response = await axios.post('/orders', data);
            console.log('We saved your order, thank you. We call you back!')
            return response.data
        } catch (error){
            console.error('Error with saving order: ', error)
        }
    }
)

const orderSlice = createSlice({
    name:'orders',
    initialState: {
        carts: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(onSaveOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(onSaveOrder.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.orders = action.payload
            })
            .addCase(onSaveOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const {} = orderSlice.actions

export const selectOrder = (state) => state.orders.orders

export const shopCartReducers = orderSlice.reducer;