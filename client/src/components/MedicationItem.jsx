import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, selectCart, updateCart} from "../redux/shoppingCartSlice";
const MedicationItem = ({medication}) => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const [amount, setAmount] = useState(1);
    const handleAddToCart = () => {
        const itemCart = cart.find((item) => item.name === medication.name);

        if(itemCart){
            if(itemCart.amount < medication.amount){
                dispatch(updateCart({name: medication.name, newAmount: itemCart.amount + 1}))
            } else{
                console.log('Ліки закінчилися')
            }
        } else {
            dispatch((addToCart({...medication, amount})))
        }

        setAmount(1);
    }
    return (
        <>
            <img src={medication.img} alt={medication.name} className='w-100 h-100'/>
            <p>{medication.name} - ${medication.price}</p>
            <p>{medication.amount !== 0 ? medication.amount : 'Ліки закінчилися'}</p>
            <button className='' onClick={() => handleAddToCart(medication)}>add to Cart</button>
        </>
    );
};

export default MedicationItem;