import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectMedication, updateMedication} from "../redux/medicationSlice";
import {getAllCarts, removeCartFromDB, removeFromCart, updateCart} from "../redux/shoppingCartSlice";

const MedicationCart = ({data}) => {
    const medication = useSelector(selectMedication);
    const [newAmount, setNewAmount] = useState(1);

    const dispatch = useDispatch()
    console.log(medication)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllCarts());
            } catch (error) {
                console.error('Error fetching carts:', error);
            }
        };

        fetchData();
    }, [dispatch]);
    const onRemoveCart = (item) => {
        dispatch(removeCartFromDB(item.id))
        dispatch(removeFromCart(item.id))
    }

    const onUpdateCart = (cart, newAmount) => {
        const filteredMedication = medication.filter(item => item.name === cart.name)
        console.log(cart.name)
        console.log(medication)
        // if (newAmount <= filteredMedication.amount) {
        //     dispatch(updateCart({ name: cart.name, newAmount }));
        // } else {
        //     console.log('Error: New amount exceeds available quantity.');
        // }
    };
    return (
        <div>
            {data?.map((item, index) => (
                <div className="card w-25 m-5   " key={index}>
                    {/*<img className="card-img-top" src="..." alt="Card image cap"/>*/}
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <h6 className="card-title">{item.price}$</h6>
                        <input type='number' value={item.amount} onChange={(e) => setNewAmount(e.target.value)}/>
                        <button onClick={() =>onUpdateCart(item, newAmount)}>Update</button>
                        <button onClick={() => onRemoveCart(item)}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MedicationCart;