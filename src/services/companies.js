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

export const createPencaCompany = (data) => {
    return axiosInstance.post('/api/pencas-empresas', data);
};

export const editCompanySubscription = (companyCode,data) => {
    return axiosInstance.patch(`/api/empresas/${companyCode}/plan`, data);
};

export const editCompanyLookAndFeel = (companyCode, data) => {
    return axiosInstance.put(`/api/lookandfeel/${companyCode}`, data);
};

export const getCompanyColors = (companyId) => {
    return axiosInstance.get(`/api/lookandfeel/${companyId}`);
};