import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../redux/shoppingCartSlice";
import MedicationItem from "./MedicationItem";
const MedicationList = ({data}) => {
    const dispatch = useDispatch();

    const handleAddToCart = (med) => {
        dispatch(addToCart(med))
        console.log('Add to cart!')
    }

    return (
        <ul className="list-group mt-3">
            {data?.medications.map((medication, medIndex) => (
                <li key={medIndex} className="list-group-item">
                   <MedicationItem medication={medication} />
                </li>
            ))}
        </ul>
    );
};

export default MedicationList;