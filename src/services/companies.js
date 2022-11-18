import { axiosInstance } from './config';
import { store } from '../app/store';

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

export const getCompanyEmployees = (companyId) => {
    return axiosInstance.get(`/api/funcionarios/empresa/${companyId}`);
};

export const getCompanySubscriptions = () => {
    const token = store.getState().session.token;
    return axiosInstance.get(`/api/planes`, {
        headers: { Authorization: `Bearer ${token}` 
    }});
};