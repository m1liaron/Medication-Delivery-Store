import { createSlice } from "@reduxjs/toolkit";
import shops from '../mock-data.json'

const shopSlice = createSlice({
    name: 'shops',
    initialState: {shops},
    reducers: {
    }
});

export const { updateMedication } = shopSlice.actions;

export const selectShop = (state) => state.shops.shops;

export const shopReducers = shopSlice.reducer;