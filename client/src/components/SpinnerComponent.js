import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
const SpinnerComponent = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default SpinnerComponent;