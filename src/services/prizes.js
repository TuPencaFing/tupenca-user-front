import { axiosInstance } from './config';

export const getPrizesByUserId = (userId) => {
    return axiosInstance.get('/api/usuario-premio', {
        params: {
            idUsuario: userId,
        },
    });
};

export const setPrizeBillingInfo = (data) => {
    const { prizeId, bankAccount, bankName } = data;
    return axiosInstance.put(`/api/usuario-premio/${prizeId}/facturacion`, {
        cuentaBancaria: bankAccount,
        banco: bankName,
    });
};
