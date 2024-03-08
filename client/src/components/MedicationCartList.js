import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectMedication, updateMedication} from "../redux/medicationSlice";
import {getAllCarts, removeCartFromDB, removeFromCart, selectCart, updateCart} from "../redux/shoppingCartSlice";
import Button from 'react-bootstrap/Button';
const MedicationCart = ({data}) => {
    const medication = useSelector(selectMedication);
    const cart = useSelector(selectCart);
    const [newAmount, setNewAmount] = useState(1);

    const dispatch = useDispatch()
    console.log(medication)

    useEffect(() => {
          dispatch(getAllCarts());
    }, []);
    const onRemoveCart = async (item) => {
        const filteredMedication = medication?.filter(item => item.name === cart.name);
        try {
            await updateMedication({id: filteredMedication._id, newAmount: item.amount + filteredMedication.amount})
            await dispatch(removeCartFromDB(item._id));
            await dispatch(removeFromCart(item._id));
            // Handle other logic as needed
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const onUpdateCart = async (cart, newAmount) => {
        try {
            const filteredMedication = medication.filter(item => item.name === cart.name);
            console.log(cart.name);
            console.log(medication);

            // Dispatch updateCart action if needed
            await dispatch(updateCart({ name: cart.name, newAmount }));
            // Handle other logic as needed
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const total = data?.map(item => item.price * item.amount);

    const totalPrice = total ? total.reduce((acc, curr) => acc + curr, 0) : 0;


    return (
        <div className="my-3  overflow-y-auto">
            <h1>Total price:{totalPrice.toFixed(2)}$</h1>
            {data?.map((item, index) => (
                <div className="card m-5 p-1 d-flex flex-row" key={index}>
                    <img className="card-img-top" src={item.img} alt={item.name} />

                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <h6 className="card-title">{item.price}$</h6>
                        <p>{item.amount}</p>

                        <div className="btn-group" role="group">
                            <Button variant="secondary" onClick={() => onUpdateCart(item)}>Update</Button>
                            <Button variant="danger" onClick={() => onRemoveCart(item)}>Remove</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MedicationCart;