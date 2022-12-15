import { axiosInstance } from './config';

export const getCompanyByCode = (companyCode) => {
    return axiosInstance.get(`/api/empresas/code/${companyCode}`);
};

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

export const uploadImage = (companyId, payload) => {
    return axiosInstance.patch(`/api/empresas/${companyId}/image`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
