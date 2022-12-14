import { axiosInstance } from './config';

export const getPencaUsers = (pencaId) => {
    return axiosInstance.get(`/api/pencas-empresas/${pencaId}/usuarios`);
};

export const enableUser = (pencaId, userId) => {
    return axiosInstance.post('/api/usuarios/habilitarUsuario', {
        pencaId,
        userId,
    }, {
        params: {
            pencaId,
            userId,
        }
    });
};

export const rejectUser = (pencaId, userId) => {
    return axiosInstance.post('/api/usuarios/rechazarUsuario', {
        pencaId,
        userId,
    }, {
        params: {
            pencaId,
            userId,
        }
    });
};
