import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {addToCartDB, selectCart, updateCart, updateCartDB} from '../redux/shoppingCartSlice';
import {dicrease, updateMedication, updateMedicationDb} from '../redux/medicationSlice';
import Button from 'react-bootstrap/Button';
const MedicationItem = ({ medication }) => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);


    const findItemInCart = (cart, itemName) => {
        if (!Array.isArray(cart)) {
            console.error('Cart is not an array:', cart);
            return null;
        }

        return cart.find((item) => item.name === itemName);
    };

    const decreaseMedicationAmount = async (medication, itemCart, dispatch) => {
        console.log('Medication exists in shoppingCart');
        if (medication.amount > 0) {
            console.log(`Ліки ще є ${medication.amount}`);
            const updatedMedication = { ...medication, amount: medication.amount - 1 };

            try {
                console.log('Тепер треба оновити ліки');
                await dispatch(updateMedicationDb({ id: medication._id, amount: updatedMedication.amount - itemCart.amount }));
                console.log('Тепер треба оновити карту в кошику');
                await dispatch(updateCartDB({ id: itemCart._id, amount: itemCart.amount + 1 }));
            } catch (error) {
                console.error('Error updating medication or cart:', error);
            }
        } else if(medication.amount <= 0){
            console.log('Ліки закінчилися');
        }
    };

    const addToCartIfNotExists = async (medication, dispatch) => {
        console.log('Додаємо карту в кошик, бо її там немає');
        const data = {
            name: medication.name,
            price: medication.price,
            amount: 1,
            img: medication.img
        };

        try {
            await dispatch(addToCartDB(data));
            await dispatch(updateMedicationDb({ id: medication._id, amount: medication.amount - 1 }));
        } catch (error) {
            console.error('Error adding to cart or updating medication:', error);
        }
    };

    const handleAddToCart = async () => {
        const itemCart = findItemInCart(cart, medication.name);

        console.log(`medication amount =${medication.amount}`);

        if (itemCart) {
            await decreaseMedicationAmount(medication, itemCart, dispatch);
        } else {
            await addToCartIfNotExists(medication, dispatch);
        }
    };

    return (
        <div className="card mb-3">
            {/*<img src={medication.img} alt={medication.name}  className="card-img-top" />*/}
            <div className="card-body">
                <h5 className="card-title">{medication.name}</h5>
                <div className="d-flex justify-content-between">
                    <p className="card-text">${medication.price}</p>
                    <p className="card-text">Amount: {medication.amount > 0 ? medication.amount : 'Закінчилися'}</p>
                </div>
                <Button variant="primary" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default MedicationItem;