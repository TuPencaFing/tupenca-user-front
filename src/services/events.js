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

export const getEventById = (eventId) => {
    return axiosInstance.get(`/api/eventos/${eventId}`);
};
