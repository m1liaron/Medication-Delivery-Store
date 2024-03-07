import React from 'react';
import ShopsList from "../components/ShopsList";
import MedicationList from "../components/MedicationList";

const ShopPage = () => {
    return (
        <>
            <ShopsList/>
            <MedicationList/>
        </>
    );
};

export default ShopPage;