import React, {useState} from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {useDispatch, useSelector} from "react-redux";
import {onSaveOrder} from "../redux/orderSlice";
import {deleteAllCarts, getAllCarts, selectCart, updateCart, updateCartDB} from "../redux/shoppingCartSlice";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Thank you, for your order. We will call you back!');

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    number: Yup.number().required('Number is required'),
    address: Yup.string().required('Address is required'),
});

const DefaultForm = () => {
    const carts = useSelector(selectCart);
    const dispatch = useDispatch()
    const saveOrderToDB = (userData) => {
        const ordersArray = {
            medications: carts,
            ...userData
    };

        console.log(ordersArray)
        dispatch(onSaveOrder(ordersArray))
        dispatch(deleteAllCarts())
        dispatch(getAllCarts())
        notify()
    };


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            number: '',
            address: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {

            const orderData = {
                userName: values.name,
                email: values.email,
                phone: values.number,
                address: values.address,
            };

            console.log(orderData)
            saveOrderToDB(orderData)
            resetForm()
        },
    });

    return (
        <Container className='p-4 h-auto' style={{ backgroundColor: '#625959', color: '#fff' }}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <input
                                className="form-control"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="error text-danger">{formik.errors.name}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <input
                                className="form-control"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error text-danger">{formik.errors.email}</div>
                            ) : null}
                        </Form.Group>
                </Row>

                <Row>
                        <Form.Group controlId="formNumber">
                            <Form.Label>Number</Form.Label>
                            <input
                                className="form-control"
                                value={formik.values.number}
                                onChange={formik.handleChange}
                                id="number"
                                type="number"
                                placeholder="Enter your number"
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.number && formik.errors.number ? (
                                <div className="error text-danger">{formik.errors.number}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <input
                                className="form-control"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                id="address"
                                type="text"
                                placeholder="Enter your address"
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.address && formik.errors.address ? (
                                <div className="error text-danger">{formik.errors.address}</div>
                            ) : null}
                        </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default DefaultForm;
