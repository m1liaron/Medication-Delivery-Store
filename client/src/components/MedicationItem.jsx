import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {addToCartDB, selectCart, updateCart, updateCartDB} from '../redux/shoppingCartSlice';
import {updateMedication, updateMedicationDb} from '../redux/medicationSlice';
import {getAllCarts} from "../redux/shoppingCartSlice";
const MedicationItem = ({ medication }) => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const [amount, setAmount] = useState(1);

    const handleAddToCart = async () => {
        try {
            console.log(Array.isArray(cart))
            if (!Array.isArray(cart)) {
                console.error('Cart is not an array:', cart);
                return;
            }

            const itemCart = cart.find((item) => item.name === medication.name);
            console.log(`We found existing medication in the basket`, itemCart)

            if (itemCart) {
                console.log(`Yes, we have this medication in the basket`)
                if (medication.amount >= 1) {
                    const updatedMedication = { ...medication, amount: medication.amount - 1 };
                    console.log(medication.amount)

                    // Use await to make sure updateCartDB is completed before moving to the next step
                    await dispatch(updateCartDB({ id: itemCart._id, amount: itemCart.amount + 1 }));

                    // Use await to make sure updateMedicationDb is completed before moving to the next step
                    await dispatch(updateMedicationDb({id: updatedMedication._id, amount: updatedMedication.amount}));

                    // Use await to make sure getAllCarts is completed before moving to the next step
                    await dispatch(getAllCarts());
                } else {
                    console.log('Ліки закінчилися');
                }
            } else {
                console.log('Add medication to the basket because it does not exist there')

                // Pass only necessary data to addToCartDB, let MongoDB generate _id
                await dispatch(addToCartDB({ name: medication.name, price: medication.price, amount }));
            }

            // Refresh cart data after updating
            await dispatch(getAllCarts());
            // setAmount(1);
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
