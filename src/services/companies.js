import { axiosInstance } from './config';

export const createCompany = (data) => {
    const { rut, companyName } = data;
    return axiosInstance.post('/api/empresas', {
        rut,
        razonsocial: companyName,
    });
};

export const getCompany = (companyId) => {
    return axiosInstance.get(`/api/empresas/${companyId}`);
};