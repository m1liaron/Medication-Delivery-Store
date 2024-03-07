import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shops from '../mock-data.json';

export const fetchShops = createAsyncThunk('shop/fetchShops', async () => {
    try {
        const response = await fetch('/shops');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
});

const shopSlice = createSlice({
    name: 'shops',
    initialState: {
        shops: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShops.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchShops.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.shops = action.payload; // Corrected from state.cards to state.shops
            })
            .addCase(fetchShops.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// export const { } = shopSlice.actions;

export const selectShop = (state) => state.shops.shops;

export const shopReducers = shopSlice.reducer;
