import {configureStore} from "@reduxjs/toolkit";
import {shopCartReducers} from "./shoppingCartSlice";
import {shopReducers} from "./shopSlice";

export const store = configureStore({
    reducer:{
        shops: shopReducers,
        cart: shopCartReducers
    }
})