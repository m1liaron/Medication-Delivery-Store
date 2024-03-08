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
                if (medication.amount > 0) {
                    const updatedMedication = { ...medication, amount: medication.amount - 1 };
                    console.log(medication.amount)

                    // await dispatch(updateCartDB({ id: itemCart._id, amount: itemCart.amount + 1 }));

                    await dispatch(updateMedicationDb({id: updatedMedication._id,  amount: medication.amount - 1}));

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
        <div className="card mb-3">
            <img src={medication.img} alt={medication.name} className="card-img-top" />
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
