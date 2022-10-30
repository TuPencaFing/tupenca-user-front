import { axiosInstance } from './config';

export const createUser = (data) => {
    const { email, username, password } = data;
    return axiosInstance.post('/api/usuarios/register', {
        email,
        username,
        password
    });
};

export const logIn = (data) => {
    const { email, password } = data;
    return axiosInstance.post('/api/usuarios/login', {
        email,
        password
    });
};
