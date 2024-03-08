import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import MedicationItem from "./MedicationItem";
import {fetchMedication, selectMedication} from "../redux/medicationSlice";
const MedicationList = ({ selectedShop }) => {
    const dispatch = useDispatch();
    const medications = useSelector(selectMedication);

    useEffect(() => {
      dispatch(fetchMedication());
    }, []);

    const filteredMedications =
        medications && medications.medications
            ? selectedShop && selectedShop.name
                ? medications.medications.filter((medication) => medication.shop === selectedShop.name)
                : []
            : [];

    return (
        <ul className="list-group mt-3 overflow-y-auto h-75">
            {filteredMedications.map((medication, medIndex) => (
                <li key={medIndex} className="list-group-item border border-dark">
                    <MedicationItem medication={medication} />
                </li>
            ))}
        </ul>
    );
};

export default MedicationList;