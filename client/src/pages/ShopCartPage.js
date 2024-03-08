import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCart,  getAllCarts} from "../redux/shoppingCartSlice";
import MedicationCartList from "../components/MedicationCartList";
import DefaultForm from "../components/DefaultForm";
import { Row, Col } from 'react-bootstrap';
const ShopCartPage = () => {
    const cartData = useSelector(selectCart);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCarts())
    }, []);

    return (
        <Row className="gx-4 gy-4">
            <Col xs={12} lg={6}>
                <DefaultForm />
            </Col>
            <Col xs={12} lg={6}>
                <MedicationCartList data={cartData} />
            </Col>
        </Row>
    );
};

export default ShopCartPage;