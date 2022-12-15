import axios from 'axios';
import { axiosInstance } from './config';
import { getStatsByPencaIdAndEventId } from './pencas';

export const savePrediction = (eventId, data) => {
    const { pencaId, prediction, localTeamResult, visitorTeamResult } = data;
    const body = {
        prediccion: prediction,
    };
    if (localTeamResult) body.puntajeEquipoLocal = parseInt(localTeamResult);
    if (visitorTeamResult) body.puntajeEquipoVisitante = parseInt(visitorTeamResult);
    return axiosInstance.post(`/api/eventos/${eventId}/prediccion?pencaId=${pencaId}`, body);
};

export const getEventById = (eventId) => {
    return axiosInstance.get(`/api/eventos/${eventId}`);
};

export const getEventPredictionByEventIdAndPencaId = (pencaId, eventId) => {
    return axiosInstance.get(`/api/eventos/${eventId}/prediccion`, {
        params: {
            pencaId,
        },
    });
};

export const getEventAndStatsByPencaIdAndEventId = (pencaId, eventId) => {
    return axios.all([
        getEventById(eventId),
        getEventPredictionByEventIdAndPencaId(pencaId, eventId),
        getStatsByPencaIdAndEventId(pencaId, eventId),
    ]).then(axios.spread((eventResponse, predictionResponse, statsResponse) => {
        return {
            data: {
                event: eventResponse.data,
                prediction: predictionResponse.data,
                stats: statsResponse.data,
            },
        };
    }));
};
