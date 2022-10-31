import { axiosInstance } from './config';

export const getUpcomingEvents = () => {
    return axiosInstance.get('/api/eventos/misproximos');
};

export const savePrediction = (eventId, data) => {
    const { resultado, puntajeEquipoLocal, puntajeEquipoVisitante } = data;
    return axiosInstance.post(`/api/eventos/${eventId}/prediccion`, {
        resultado,
        puntajeEquipoLocal,
        puntajeEquipoVisitante,
    });
};
