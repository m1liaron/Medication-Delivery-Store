import axios from 'axios';
import { useState } from 'react';

const useAxios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const instance = axios.create({
        baseURL: `http://localhost:3000`,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const request = async (config) => {
        try {
            setLoading(true);
            const response = await instance(config);
            setLoading(false);
            return response;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    }

    // instance.interceptors.request.use(
    //     async (config) => {
    //         setLoading(true);
    //         const token = await AsyncStorage.getItem('token');
    //         if (token) {
    //             config.headers.Authorization = `Bearer ${token}`;
    //         }
    //         setLoading(false);
    //         return config;
    //     },
    //     (error) => {
    //         setLoading(false);
    //         return Promise.reject(error);
    //     }
    // );

    return { loading, error, request };
}

export default useAxios;