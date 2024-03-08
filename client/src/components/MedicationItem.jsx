import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartDB, selectCart, updateCartDB } from '../redux/shoppingCartSlice';
import { decrease, updateMedication, updateMedicationDb } from '../redux/medicationSlice';
import Button from 'react-bootstrap/Button';

const MedicationItem = ({ medication }) => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);

    const findItemInCart = (cart, itemName) => Array.isArray(cart) ? cart.find(item => item.name === itemName) : null;

    const decreaseMedicationAmount = async (medication, itemCart) => {
        if (medication.amount > 0) {
            const updatedMedication = { ...medication, amount: medication.amount - 1 };

            try {
                await dispatch(updateMedicationDb({ id: medication._id, amount: updatedMedication.amount - itemCart.amount }));
                await dispatch(updateCartDB({ id: itemCart._id, amount: itemCart.amount + 1 }));
            } catch (error) {
                console.error('Error updating medication or cart:', error);
            }
        } else {
            console.log('Ліки закінчилися');
        }
    };

    const addToCartIfNotExists = async (medication) => {
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

        if (itemCart) {
            await decreaseMedicationAmount(medication, itemCart);
        } else {
            await addToCartIfNotExists(medication);
        }
    };

    return (
        <div className="card mb-3">
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
