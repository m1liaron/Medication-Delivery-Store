import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, addToCartDB, selectCart, updateCart} from "../redux/shoppingCartSlice";
import {updateMedication} from "../redux/medicationSlice";
const MedicationItem = ({medication}) => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const [amount, setAmount] = useState(1);

    const handleAddToCart = () => {
        console.log(cart)
        // Check if cart is an array
        if (Array.isArray(cart)) {
            const itemCart = cart.find((item) => item.name === medication.name);

            if (itemCart) {
                if (itemCart.amount < medication.amount) {
                    dispatch(updateCart({ name: medication.name, newAmount: itemCart.amount + 1 }));
                    dispatch(updateMedication({ id: itemCart._id, amount: medication.amount - (itemCart.amount + 1) }));
                } else {
                    console.log('Ліки закінчилися');
                }
            } else {
                dispatch(addToCartDB({ ...medication, amount, id: medication._id }));
            }
        } else {
            console.error('Error: cart is not an array');
        }

        setAmount(1);
    };
    return (
        <>
            <img src={medication.img} alt={medication.name} className='w-100 h-100'/>
            <p>{medication.name} - ${medication.price}</p>
            <p>{medication.amount}</p>
            <button className='' onClick={() => handleAddToCart(medication)}>add to Cart</button>
        </>
    );
};

export default MedicationItem;