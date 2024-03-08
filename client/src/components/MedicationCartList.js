import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedication, selectMedication, updateMedication, updateMedicationDb } from '../redux/medicationSlice';
import {
    getAllCarts,
    removeCartFromDB,
    removeFromCart,
    selectCart,
    updateCart,
    updateCartDB
} from '../redux/shoppingCartSlice';
import Button from 'react-bootstrap/Button';
import toast,{Toaster} from "react-hot-toast";

const MedicationCartList = ({ data }) => {
    const medications = useSelector(selectMedication);
    const cart = useSelector(selectCart);
    const [newAmount, setNewAmount] = useState(1);

    useEffect(() => {
        dispatch(fetchMedication())
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCarts());
    }, []);

    const onRemoveCart = async (item) => {
        console.log('Початок onRemoveCart function');
        console.log('Знаходимо ліки, з таким самим name');
        const filteredMedication = medications.medications.find((med) => med.name === item.name);
        console.log('Ось ці ліки', filteredMedication);
        try {
            console.log('Оновлюємо ліки, щоб повертнути кількість назад');
            console.log(`Cart amount = ${item.amount}, medication amount = ${filteredMedication.amount}`);
            console.log('cart amount + medication amount =', item.amount + filteredMedication.amount);
            await dispatch(updateMedicationDb({ id: filteredMedication._id, amount: filteredMedication.amount + item.amount }))
            console.log('Видаляємо картку з кошика Database');
            await dispatch(removeCartFromDB(item._id));
            console.log('Видаляємо картку з кошика frontend');
            // Handle other logic as needed
            console.log('Функція закінчена');
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const total = data?.map((item) => item.price * item.amount);

    const totalPrice = total ? total.reduce((acc, curr) => acc + curr, 0) : 0;

    const onUpdateCart = (cart) => {
        console.log(medications.medications)
        const findMedication = medications.medications.find(med => med.name === cart.name);
        console.log(newAmount)
        if(findMedication.amount < newAmount){
            toast.error(`We don't have this amount of drugs, we have ${findMedication.amount}`)
        } else if(parseInt(newAmount) === 0){
            toast.error("You can't add 0 amount")
        } else {
            console.log('Update cart')
            toast.success('Updating cart');
            dispatch(updateCartDB({id: cart._id, amount: parseInt(newAmount)}));
        }
    }

    return (
        <div className="my-3 overflow-y-auto h-50">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1>Total price:{totalPrice.toFixed(2)}$</h1>
            {data?.map((item, index) => (
                <div className="card m-5 p-1 d-flex flex-row" key={index}>
                    <img className="card-img-top" width={100} height={400} src={item.img} alt={item.name} />

                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <h6 className="card-title">{item.price}$</h6>
                        <p>{item.amount}</p>
                        <input value={newAmount} onChange={(e) => setNewAmount(e.target.value)} type='number' min='1'/>

                        <div className="btn-group" role="group">
                            <Button variant="secondary" onClick={() => onUpdateCart(item)}>
                                Update
                            </Button>
                            <Button variant="danger" onClick={() => onRemoveCart(item)}>
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MedicationCartList;
