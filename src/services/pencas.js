import { axiosInstance } from './config';

export const getPencas = () => {
    return axiosInstance.get('/api/pencas-compartidas/me', {
        params: {
            joined: false,
        },
    });
};

export const getMyPencas = () => {
    return axiosInstance.get('/api/pencas-compartidas/me', {
        params: {
            joined: true,
        }
    });
};

export const getCompanyPencas = () => {
    return axiosInstance.get('/api/pencas-empresas/miempresa');
};

export const joinPenca = (pencaId) => {
    return axiosInstance.post(`/api/pencas-compartidas/${pencaId}/add`);
};

export const getPencaById = (pencaId) => {
    return axiosInstance.get(`/api/pencas-compartidas/${pencaId}`);
};
