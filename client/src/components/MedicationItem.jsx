import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {addToCartDB, selectCart, updateCart, updateCartDB} from '../redux/shoppingCartSlice';
import {updateMedication, updateMedicationDb} from '../redux/medicationSlice';
import {getAllCarts} from "../redux/shoppingCartSlice";
import Button from 'react-bootstrap/Button';
const MedicationItem = ({ medication }) => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);

    const handleAddToCart = async () => {
        if (!Array.isArray(cart)) {
            console.error('Cart is not an array:', cart);
            return;
        }

        const itemCart = cart.find((item) => item.name === medication.name);

        console.log(`medication amout =${medication.amount}`)
        if (itemCart) {
            console.log('Medication exists in shoppingCart');
            if (medication.amount > 0) {
                console.log(`Ліки ще є ${medication.amount}`);
                // Decrease medication amount locally before dispatching the update
                const updatedMedication = { ...medication, amount: medication.amount - 1 };

                try {
                    // Dispatch update for medication first
                    console.log('Тепер треба оновити ліки');
                    await dispatch(updateMedicationDb({ id: medication._id, amount: updatedMedication.amount - itemCart.amount }));
                    // Then dispatch the update for the cart
                    console.log('Тепер треба оновити карту в кошику');
                    await dispatch(updateCartDB({ id: itemCart._id, amount: itemCart.amount + 1 }));
                } catch (error) {
                    console.error('Error updating medication or cart:', error);
                }
            } else if(medication.amount <= 0){
                console.log('Ліки закінчилися');
            }
        } else {
            // Medication not in the cart, add it
            console.log('Додаємо карту в кошик, бо її там немає');
            const data = {
                name: medication.name,
                price: medication.price,
                amount: 1,
                img: medication.img
            };

            try {
                // Dispatch both addToCart and updateMedication
                await dispatch(addToCartDB(data));
                // Update medication amount immediately after adding to cart
                await dispatch(updateMedicationDb({ id: medication._id, amount: medication.amount - 1 }));
            } catch (error) {
                console.error('Error adding to cart or updating medication:', error);
            }
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
