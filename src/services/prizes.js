import { axiosInstance } from './config';

export const getPrizesByUserId = (userId, claimed) => {
    return axiosInstance.get('/api/usuario-premio', {
        params: {
            idUsuario: userId,
            reclamado: claimed,
        },
    });
};

export const setPrizeBillingInfo = (data) => {
    const { prizeId, bankAccount, bankName } = data;
    return axiosInstance.put(`/api/usuario-premio/${prizeId}/facturacion`, {
        id: prizeId,
        cuentaBancaria: bankAccount,
        banco: bankName,
    });
};
