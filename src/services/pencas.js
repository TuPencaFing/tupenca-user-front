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

export const joinPenca = (pencaId, cardFormData) => {
    const {
        transaction_amount: transactionAmount,
        token,
        installments,
        payment_method_id: paymentMethodId,
        payer,
    } = cardFormData;
    return axiosInstance.post(`/api/pencas-compartidas/${pencaId}/add`, {
        token,
        installments,
        payer,
        payment_method_id: paymentMethodId,
        transaction_amount: transactionAmount,
    });
};

export const getPencaById = (pencaId) => {
    return axiosInstance.get(`/api/pencas-compartidas/${pencaId}`);
};

export const getPencaInfoById = (pencaId) => {
    return axiosInstance.get(`/api/pencas-compartidas/${pencaId}/info`);
};

export const getStatsByPencaIdAndEventId = (pencaId, eventId) => {
    return axiosInstance.get(`/api/pencas-compartidas/${pencaId}/eventos/${eventId}/estadisticas`);
};
