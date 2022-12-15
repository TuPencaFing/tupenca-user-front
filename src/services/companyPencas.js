import axios from 'axios';
import { axiosInstance } from './config';
import { getEventById } from './events';

export const getPencas = (companyCode) => {
    return axiosInstance.get('/api/pencas-empresas', {
        params: {
            TenantCode: companyCode,
        },
    });
};

export const getCompanyPencaInfoById = (pencaId) => {
    return axiosInstance.get(`/api/pencas-empresas/${pencaId}/info`);
};

const getCompanyPencasList = () => {
    return axiosInstance.get('/api/pencas-empresas/miempresa');
};

const getRemainingPencasCounter = (companyCode) => {
    return axiosInstance.get('/api/pencas-empresas/pencasRestantes', {
        params: {
            tenantCode: companyCode,
        },
    });
};

export const getCompanyPencas = (companyCode) => {
    return axios.all([
        getCompanyPencasList(),
        getRemainingPencasCounter(companyCode),
    ]).then(axios.spread((pencasResponse, pencasCounter) => {
        return {
            data: {
                pencas: pencasResponse.data,
                pencasCounter: pencasCounter.data,
            },
        };
    }));
};

export const getStatsByCompanyUserPencaIdAndEventId = (pencaId, eventId) => {
    return axiosInstance.get(`/api/pencas-empresas/${pencaId}/eventos/${eventId}/estadisticas`);
};

export const getEventAndStatsByCompanyPencaIdAndEventId = (pencaId, eventId) => {
    return axios.all([
        getEventById(eventId),
        getStatsByCompanyUserPencaIdAndEventId(pencaId, eventId),
    ]).then(axios.spread((eventResponse, statsResponse) => {
        return {
            data: {
                event: eventResponse.data,
                stats: statsResponse.data,
            },
        };
    }));
};

export const createPenca = (companyCode, data) => {
    const { title, description, championship: championshipId, prizes } = data;
    const prizesReq = [];
    prizes.forEach((prizeId) => {
        prizesReq.push({
            id: prizeId,
        });
    });
    return axiosInstance.post('/api/pencas-empresas', {
        title,
        description,
        campeonato: {
            id: championshipId,
        },
        premios: prizesReq,
    }, {
        params: {
            tenantCode: companyCode,
        },
    });
};

export const uploadImage = (pencaId, payload) => {
    return axiosInstance.patch(`/api/pencas-empresas/${pencaId}/image`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
