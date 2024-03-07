import {configureStore} from "@reduxjs/toolkit";
import {shopCartReducers} from "./shoppingCartSlice";
import {shopReducers} from "./shopSlice";
import {medicationReducers} from "./medicationSlice";

export const store = configureStore({
    reducer:{
        shops: shopReducers,
        medications: medicationReducers,
        cart: shopCartReducers
    }
})