import axios from 'axios';
import { axiosInstance } from './config';
import { getStatsByPencaIdAndEventId } from './pencas';

export const savePrediction = (eventId, data) => {
    const { pencaId, result, localTeamResult, visitorTeamResult } = data;
    const body = {
        resultado: result,
    };
    if (localTeamResult) body.puntajeEquipoLocal = parseInt(localTeamResult);
    if (visitorTeamResult) body.puntajeEquipoVisitante = parseInt(visitorTeamResult);
    return axiosInstance.post(`/api/eventos/${eventId}/prediccion?pencaId=${pencaId}`, body);
};

export const getEventById = (eventId) => {
    return axiosInstance.get(`/api/eventos/${eventId}`);
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

export const getChampionships = () => {
    return axiosInstance.get('/api/campeonatos');
};

export const getPrizes = () => {
    return axiosInstance.get('/api/premios');
};
