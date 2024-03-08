import {configureStore} from "@reduxjs/toolkit";
import {shopCartReducers} from "./shoppingCartSlice";
import {shopReducers} from "./shopSlice";
import {medicationReducers} from "./medicationSlice";
import {orderReducers} from "./orderSlice";

export const store = configureStore({
    reducer:{
        shops: shopReducers,
        medications: medicationReducers,
        cart: shopCartReducers,
        orders: orderReducers
    }
})