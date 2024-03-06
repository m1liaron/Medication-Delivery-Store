import React, {useState} from 'react';
import shops from '../mock-data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import MedicationList from "./MedicationList";
import {useSelector} from "react-redux";
import {selectShop} from "../redux/shopSlice"; // Import Bootstrap CSS

const ShopsList = () => {
    const shopsData = useSelector(selectShop)
    const [selected, setSelected] = useState(shopsData.shops[0]);

    return (
        <div className="container mt-4">
            <h1>Shops: </h1>
            <div className="row">
                {/* Left column for shops */}
                <div className="col-md-6">
                    <ul className="list-group">
                        {shopsData.shops.map((shop, index) => (
                            <li key={index}
                                className="list-group-item m-2 p-3 rounded"
                                onClick={() => setSelected(shop)}
                            >
                                <h2>{shop.name}</h2>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right column for medications */}
                <div className="col-md-6">
                    <MedicationList data={selected}/>
                </div>
            </div>
        </div>
    );
};

export default ShopsList;