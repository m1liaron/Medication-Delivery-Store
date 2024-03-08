import React from 'react';
import ShopsList from "../components/ShopsList";
import MedicationList from "../components/MedicationList";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

const ShopPage = () => {
    return (
        <>
            {/*<button onClick={notify}>Make me a toast</button>*/}
            {/*<Toaster/>*/}
            <ShopsList/>
            <MedicationList/>
        </>
    );
};

export default ShopPage;