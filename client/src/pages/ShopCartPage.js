import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCart, updateCart, removeFromCart} from "../redux/shoppingCartSlice";
const ShopCartPage = () => {
    const cartData = useSelector(selectCart);
    const [newAmount, setNewAmount] = useState('');

    const dispatch = useDispatch()
    console.log(cartData)

    const onRemoveCart = (name) => {
        dispatch(removeFromCart(name))
    }

    return (
        <div>
            ShopCartPage
            {cartData.map((item, index) => (
                <div className="card w-25 m-5   " key={index}>
                    {/*<img className="card-img-top" src="..." alt="Card image cap"/>*/}
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <input type='number' value={item.amount}/>
                        <button onClick={() => onRemoveCart(item.name)}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShopCartPage;