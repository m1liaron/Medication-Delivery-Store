import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCart, updateCart, removeFromCart, getAllCarts} from "../redux/shoppingCartSlice";
import {selectMedication} from "../redux/medicationSlice";
import MedicationCartList from "../components/MedicationCartList";
const ShopCartPage = () => {
    const medication = useSelector(selectMedication);
    const cartData = useSelector(selectCart);
    const [newAmount, setNewAmount] = useState(1);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCarts())
    }, []);

    const onUpdateCart = (cart, newAmount) => {
        const filteredMedication = medication.filter(item => item.name === cart.name)
        if (newAmount <= filteredMedication.amount) {
            dispatch(updateCart({ name: cart.name, newAmount }));
        } else {
            // Display an error message or handle the situation where the new amount exceeds the available quantity.
            console.log('Error: New amount exceeds available quantity.');
        }
    };

    return (
        <div>
            ShopCartPage
            <MedicationCartList data={cartData}/>
        </div>
    );
};

export default ShopCartPage;