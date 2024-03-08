import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartDB, selectCart, updateCartDB } from '../redux/shoppingCartSlice';
import {selectMedication, updateIsFavorite, updateMedicationDb} from '../redux/medicationSlice';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const MedicationItem = ({ medication }) => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const [isStarClicked, setIsStarClicked] = useState(false);
    const findItemInCart = (cart, itemName) => Array.isArray(cart) ? cart.find(item => item.name === itemName) : null;

    const decreaseMedicationAmount = async (medication, itemCart) => {
        if (medication.amount > 0) {
            const updatedMedication = { ...medication, amount: medication.amount - 1 };

            try {
                await dispatch(updateMedicationDb({ id: medication._id, amount: updatedMedication.amount }));
                await dispatch(updateCartDB({ id: itemCart._id, amount: itemCart.amount + 1 }));
            } catch (error) {
                console.error('Error updating medication or cart:', error);
            }
        } else {
            console.log('Ліки закінчилися');
        }
    };

    const addToCartIfNotExists = async (medication) => {
        const existingCartItem = findItemInCart(cart, medication.name);

        if (existingCartItem) {
            // Medication already exists in the cart, update the amount
            try {
                await dispatch(updateCartDB({ id: existingCartItem._id, amount: existingCartItem.amount + 1 }));
                await dispatch(updateMedicationDb({ id: medication._id, amount: medication.amount - 1 }));
            } catch (error) {
                console.error('Error updating cart or medication:', error);
            }
        } else {
            // Medication doesn't exist in the cart, add it
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
        }
    };

    const handleAddToCart = async () => {
        const itemCart = findItemInCart(cart, medication.name);

        console.log('ItemCart', itemCart)
        if (itemCart) {
            await decreaseMedicationAmount(medication, itemCart);
        } else {
            await addToCartIfNotExists(medication);
        }
    };

    const handleStarClick = () => {
        setIsStarClicked(!isStarClicked);
        dispatch(updateMedicationDb({id: medication._id, isFavorite: !isStarClicked}))
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{medication.name}</h5>
                <div className="d-flex justify-content-between">
                    <p className="card-text">${medication.price}</p>
                    <p className="card-text">Amount: {medication.amount > 0 ? medication.amount : 'Закінчилися'}</p>
                </div>
                <FontAwesomeIcon
                    icon={faStar}
                    style={{
                        cursor: 'pointer',
                        color: medication.isFavorite ? 'yellow' : 'gray',
                    }}
                    onClick={handleStarClick}
                />
                <Button variant="primary" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default MedicationItem;