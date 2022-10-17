import { axiosInstance } from "./config";

export const createUser = (data) => {
    const { email, username, password } = data;
    return axiosInstance.post('/User/register', {
        email,
        username,
        password
    });
};

export const logIn = (data) => {
    const { email, password } = data;
    return axiosInstance.post('/User/login', {
        email,
        password
    });
};
