import axios from 'axios';
import { axiosInstance } from './config';

export const savePrediction = (eventId, data) => {
    const { pencaId, result, localTeamResult, visitorTeamResult } = data;
    const body = {
        resultado: result,
    };
    if (localTeamResult) body.puntajeEquipoLocal = parseInt(localTeamResult);
    if (visitorTeamResult) body.puntajeEquipoVisitante = parseInt(visitorTeamResult);
    return axiosInstance.post(`/api/eventos/${eventId}/prediccion?pencaId=${pencaId}`, body);
};

const getEventById = (eventId) => {
    return axiosInstance.get(`/api/eventos/${eventId}`);
};

const getStatsByPencaIdAndEventId = (pencaId, eventId) => {
    console.log('stats: ', pencaId, eventId);
    return axiosInstance.get(`/api/pencas-compartidas/${pencaId}/evento/${eventId}/estadisticas`);
};

export const getEventAndStatsByPencaIdAndEventId = (pencaId, eventId) => {
    return axios.all([
        getEventById(eventId),
        getStatsByPencaIdAndEventId(pencaId, eventId),
    ]).then(axios.spread((eventResponse, statsResponse) => {
        return {
            data: {
                event: eventResponse.data,
                stats: statsResponse.data,
            },
        };
    }));
};
