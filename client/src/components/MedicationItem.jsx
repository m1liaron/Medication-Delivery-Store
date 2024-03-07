import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartDB, selectCart, updateCart } from '../redux/shoppingCartSlice';
import { updateMedication } from '../redux/medicationSlice';

const MedicationItem = ({ medication }) => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const [amount, setAmount] = useState(1);

    const handleAddToCart = async () => {
        try {
            const itemCart = cart?.find((item) => item.name === medication.name);

            console.log(cart)
            if (itemCart) {
                if (itemCart.amount < medication.amount) {
                    dispatch(updateCart({ name: medication.name, newAmount: itemCart.amount + 1 }));
                    await dispatch(updateMedication({ id: itemCart._id, amount: medication.amount - (itemCart.amount + 1) }));
                } else {
                    console.log('Ліки закінчилися');
                }
            } else {
                await dispatch(addToCartDB({ ...medication, amount, id: medication._id }));
            }

            setAmount(1);
        } catch (error) {
            console.error('Error handling addToCart:', error);
        }
    };

    return (
        <>
            <img src={medication.img} alt={medication.name} className="w-100 h-100" />
            <p>
                {medication.name} - ${medication.price}
            </p>
            <p>{medication.amount}</p>
            <button className="" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </>
    );
};

export default MedicationItem;
