import { axiosInstance } from './config';

export const createCompany = (data) => {
    const { companyName, rut, companyCode, planId, cardFormData } = data;
    const {
        transaction_amount: transactionAmount,
        token,
        installments,
        payment_method_id: paymentMethodId,
        payer,
    } = cardFormData;
    return axiosInstance.post('/api/empresas', {
        rut,
        razonsocial: companyName,
        tenantCode: companyCode,
        planId,
        pago: {
            token,
            installments,
            payer,
            payment_method_id: paymentMethodId,
            transaction_amount: transactionAmount,
        },
    });
};

export const getCompany = (companyId) => {
    return axiosInstance.get(`/api/empresas/${companyId}`);
};

export const getCompanyEmployees = (companyId) => {
    return axiosInstance.get(`/api/funcionarios/empresa/${companyId}`);
};

export const getCompanySubscriptions = () => {
    return axiosInstance.get('/api/planes');
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
