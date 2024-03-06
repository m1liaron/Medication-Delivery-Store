import React from 'react';
import ShopsList from "../components/ShopsList";
import MedicationList from "../components/MedicationList";

const ShopPage = () => {
    return (
        <div>
            <ShopsList/>
            <MedicationList/>
        </div>
    );
};

export default ShopPage;