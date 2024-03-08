import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, selectOrder } from '../redux/orderSlice';

const HistoryPage = () => {
    const history = useSelector(selectOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const formatCreatedAt = (createdAt) => {
        return new Date(createdAt).toLocaleString();
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Order History</h1>
            {history.length ? (
                history.map((order) => (
                    <div key={order._id} className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Order Details</h5>
                            <p className="card-text">
                                <strong>User:</strong> {order.userName}
                            </p>
                            <p className="card-text">
                                <strong>Email:</strong> {order.email}
                            </p>
                            <p className="card-text">
                                <strong>Phone:</strong> {order.phone}
                            </p>
                            <p className="card-text">
                                <strong>Address:</strong> {order.address}
                            </p>
                            <p className="card-text">
                                <strong>Data:</strong> {formatCreatedAt(order.createdAt)}
                            </p>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Medications</h5>
                            <ul className="list-group">
                                {order.medications.map((medication) => (
                                    <li key={medication._id} className="list-group-item">
                                        {medication.name} - Quantity: {medication.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <h2>There is no history of orders yet.</h2>
            )}
        </div>
    );
};

export default HistoryPage;
