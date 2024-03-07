// DefaultForm.jsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const DefaultForm = () => {
    return (
        <Form className='my-3 m-5 p-5' style={{ backgroundColor: '#343a40', color: 'white' }}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" placeholder="Enter phone" />
            </Form.Group>


            <Form.Group controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control type="address" placeholder="Enter address" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default DefaultForm;
