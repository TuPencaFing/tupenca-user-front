import { axiosInstance } from './config';

export const createEmployee = (data) => {
    const { email, username, password, companyId } = data;
    return axiosInstance.post('/api/funcionarios/register', {
        email,
        username,
        password,
        empresa: {
            id: companyId,
        },
    });
};

export const logIn = (data) => {
    const { email, password } = data;
    return axiosInstance.post('/api/funcionarios/login', {
        email,
        password
    });
};
