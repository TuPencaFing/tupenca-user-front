import axios from 'axios';
import { axiosInstance } from './config';

export const getPencaUsersList = (pencaId) => {
    return axiosInstance.get(`/api/pencas-empresas/${pencaId}/usuarios`);
};

const getRemainingUsersCounter = (companyCode, pencaId) => {
    return axiosInstance.get(`/api/pencas-empresas/${pencaId}/usuariosRestantes`, {
        params: {
            tenantCode: companyCode,
        },
    });
};

export const getPencaUsers = (companyCode, pencaId) => {
    return axios.all([
        getPencaUsersList(pencaId),
        getRemainingUsersCounter(companyCode, pencaId),
    ]).then(axios.spread((usersResponse, usersCounterResponse) => {
        return {
            data: {
                users: usersResponse.data,
                usersCounter: usersCounterResponse.data,
            },
        };
    }));
};

export const enableUser = (pencaId, userId, companyCode) => {
    return axiosInstance.post('/api/usuarios/habilitarUsuario', null, {
        params: {
            pencaId,
            userId,
            tenantCode: companyCode,
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
