import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCarts = createAsyncThunk(
    'cart/getAllCarts',
    async () => {
        try {
            const response = await axios.get('https://medication-delivery-store.onrender.com/shopcarts');
            return response.data;
        } catch (error) {
            console.error('Error fetching carts:', error);
            throw error;
        }
    });

export const addToCartDB = createAsyncThunk('cart/addToCart', async (data) => {
    try {
        const response = await axios.post('https://medication-delivery-store.onrender.com/shopcarts', data);
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
});

export const updateCartDB = createAsyncThunk('cart/updateCart', async (data) => {
    try {
        console.log('Оновлюємо картку в кошику')
        const response = await axios.put(`https://medication-delivery-store.onrender.com/shopcarts/${data.id}`, { amount: data.amount });
        console.log('Оновлена картка = ', response.data);
        return response.data;  // Make sure the server returns the updated cart
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
});

export const removeCartFromDB = createAsyncThunk('cart/removeCart', async (id) => {
    try {
        await axios.delete(`https://medication-delivery-store.onrender.com/shopcarts/${id}`);
        return id; // Return the ID to remove it from the state
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
});

export const deleteAllCarts = createAsyncThunk(
    'cart/deleteAllCarts',
    async() => {
        try{
            console.log('delete all carts')
            const response = await axios.delete('https://medication-delivery-store.onrender.com/shopcarts')
            console.log(response);
            return [];
        } catch (error){
            console.error('Error delete all carts:', error);
            throw error;
        }
    })

const shoppingCartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addToCart: (state, action) => {
            state.carts = [...state.carts, action.payload];
        },
        removeFromCart: (state, action) => {
            state.carts = state.carts.filter(item => item._id !== action.payload);
        },
        updateCart: (state, action) => {
            const { name, newAmount } = action.payload;
            const itemToUpdate = state.carts.find(item => item.name === name);

            if (itemToUpdate) {
                itemToUpdate.amount = newAmount;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCarts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllCarts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.carts = Array.isArray(action.payload) ? action.payload : [action.payload];
            })
            .addCase(getAllCarts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addToCartDB.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.carts = Array.isArray(action.payload) ? action.payload : [action.payload];
            })
            .addCase(updateCartDB.fulfilled, (state, action) => {
                const { _id, amount } = action.payload;
                const itemToUpdate = state.carts.find(item => item._id === _id);

                if (itemToUpdate) {
                    itemToUpdate.amount = amount;
                }
            })
            .addCase(removeCartFromDB.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.carts = state.carts.filter(item => item._id !== action.payload);
            })
            .addCase(deleteAllCarts.fulfilled, (state) => {
                state.status = 'succeeded';
                state.carts = [];
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.status = 'loading';
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                }
            );
    },
});

export const { addToCart, updateCart, removeFromCart } = shoppingCartSlice.actions;

export const selectCart = (state) => state.cart.carts;

export const shopCartReducers = shoppingCartSlice.reducer;