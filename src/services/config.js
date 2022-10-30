import axios from 'axios';
import { store } from '../app/store';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
});

const configurationPreRequest = (config) => {
    const token = store.getState().session.token;
    if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

axiosInstance.interceptors.request.use(configurationPreRequest);
