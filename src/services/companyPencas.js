import axios from 'axios';
import { axiosInstance } from './config';
import { getEventById } from './events';

export const getPencas = () => {
    return axiosInstance.get('/api/pencas-empresas');
};

export const getCompanyPencaInfoById = (pencaId) => {
    return axiosInstance.get(`/api/pencas-empresas/${pencaId}/info`);
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
