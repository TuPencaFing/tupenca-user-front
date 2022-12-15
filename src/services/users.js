import { axiosInstance } from './config';

export const createUser = (payload) => {
    return axiosInstance.post('/api/usuarios/register', payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const logIn = (data) => {
    const { email, password } = data;
    return axiosInstance.post('/api/usuarios/login', {
        email,
        password
    });
};

export const signInWithGoogle = (data) => {
    const { accessToken } = data;
    return axiosInstance.post('/api/usuarios/googleLogin', {
        accessToken,
    });
};

export const forgotPassword = (data) => {
    const { email } = data;
    return axiosInstance.post('/api/usuarios/forgotPassword', {
        email,
    });
};

export const resetPassword = (data) => {
    const { token, password } = data;
    return axiosInstance.post('/api/usuarios/resetPassword', {
        token,
        password,
    });
};

export const acceptInvitation = (data) => {
    const { accessToken } = data;
    return axiosInstance.post('/api/usuarios/aceptarInvitacion', {}, {
        params: {
            access_token: accessToken,
        }
    });
};

export const rejectInvitation = (data) => {
    const { accessToken } = data;
    return axiosInstance.post('/api/usuarios/rechazarInvitacion', {}, {
        params: {
            access_token: accessToken,
        }
    });
};
