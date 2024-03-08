import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MedicationItem from './MedicationItem';
import { fetchMedication, selectMedication } from '../redux/medicationSlice';
import SpinnerComponent from './SpinnerComponent';

const MedicationList = ({ selectedShop }) => {
    const [price, setPrice] = useState(1);
    const [sortedMedications, setSortedMedications] = useState([]);
    const dispatch = useDispatch();
    const medications = useSelector(selectMedication);

    useEffect(() => {
        dispatch(fetchMedication());
    }, []);

    const filteredMedications =
        medications && medications.medications
            ? selectedShop && selectedShop.name
                ? medications?.medications.filter((medication) => medication.shop === selectedShop.name)
                : []
            : [];

    const minPrice = Math.min(...filteredMedications.map((medication) => medication.price));
    const maxPrice = Math.max(...filteredMedications.map((medication) => medication.price));

    const favoriteMedications = filteredMedications.filter((medication) => medication.isFavorite);
    const nonFavoriteMedications = filteredMedications.filter((medication) => !medication.isFavorite);

    useEffect(() => {
        const sortedByPrice = nonFavoriteMedications.filter((item) => item.price <= parseInt(price));
        setSortedMedications([...favoriteMedications, ...sortedByPrice]);
    }, [price]);

    return (
        <ul className="list-group mt-3 overflow-y-auto">
            <h3>Sort by price:</h3>
            <h4>Price: {price}$</h4>
            <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {medications ? (
                sortedMedications.length > 0 ? (
                    sortedMedications.map((medication, medIndex) => (
                        <li key={medIndex} className="list-group-item border border-dark">
                            <MedicationItem medication={medication} />
                        </li>
                    ))
                ) : (
                    filteredMedications.map((medication, medIndex) => (
                        <li key={medIndex} className="list-group-item border border-dark">
                            <MedicationItem medication={medication} />
                        </li>
                    ))
                )
            ) : (
                <SpinnerComponent />
            )}
        </ul>
    );
};

export default MedicationList;
