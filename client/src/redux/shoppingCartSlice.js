import { createSlice } from "@reduxjs/toolkit";

const shoppingCartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: []
    },
    reducers: {
        addToCart: (state, action) => {
            state.carts = [...state.carts, action.payload];
        },
        removeFromCart: (state, action) => {
          state.carts = state.carts.filter(item => item.name !== action.payload)
        },
        updateCart: (state, action) => {
            const { name, newAmount } = action.payload;
            const itemToUpdate = state.carts.find(item => item.name === name);

            if (itemToUpdate) {
                // If the item is found, update its quantity
                itemToUpdate.amount = newAmount;
            }
        }
    }
});

export const { addToCart, updateCart, removeFromCart } = shoppingCartSlice.actions;

export const selectCart = (state) => state.cart.carts;

export const shopCartReducers = shoppingCartSlice.reducer;