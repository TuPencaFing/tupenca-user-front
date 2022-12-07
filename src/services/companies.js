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
