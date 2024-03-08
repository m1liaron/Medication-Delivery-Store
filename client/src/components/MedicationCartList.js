import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMedication, selectMedication, updateMedication, updateMedicationDb} from "../redux/medicationSlice";
import {getAllCarts, removeCartFromDB, removeFromCart, selectCart, updateCart} from "../redux/shoppingCartSlice";
import Button from 'react-bootstrap/Button';
const MedicationCart = ({data}) => {
    const medications = useSelector(selectMedication);
    const cart = useSelector(selectCart);
    const [newAmount, setNewAmount] = useState(1);

    const dispatch = useDispatch()

    useEffect(() => {
          dispatch(getAllCarts());
    }, []);
    const onRemoveCart = async (item) => {
        console.log('Початок onRemoveCart function')
        console.log('Знаходимо ліки, з таким самим name')
        const filteredMedication = medications.medications.find(med => med.name === item.name);
        console.log('Ось ці ліки', filteredMedication);
        try {
            console.log('Оновлюємо ліки, щоб повертнути кількість назад')
            console.log(`Cart amount = ${item.amount}, medication amount = ${filteredMedication.amount}`)
            console.log('cart amount + medication amount =',item.amount + filteredMedication.amount)
            await updateMedicationDb({id: filteredMedication._id, amount: filteredMedication.amount})
            console.log('Видаляємо картку з кошика Database');
            await dispatch(removeCartFromDB(item._id));
            console.log('Видаляємо картку з кошика frontend');
            await dispatch(removeFromCart(item._id));
            dispatch(fetchMedication())
            // Handle other logic as needed
            console.log('Функція закінчена');
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const onUpdateCart = async (cart, newAmount) => {
        try {
            const filteredMedication = medications.filter(item => item.name === cart.name);

            // Dispatch updateCart action if needed
            await dispatch(updateMedicationDb({id: filteredMedication.amount, amount: filteredMedication.amount + cart.amount}))
            await dispatch(updateCart({ name: cart.name, newAmount }));
            // Handle other logic as needed
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const total = data?.map(item => item.price * item.amount);

    const totalPrice = total ? total.reduce((acc, curr) => acc + curr, 0) : 0;


    // console.log(data)
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