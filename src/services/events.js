import { axiosInstance } from './config';

export const savePrediction = (eventId, data) => {
    const { resultado, puntajeEquipoLocal, puntajeEquipoVisitante } = data;
    return axiosInstance.post(`/api/eventos/${eventId}/prediccion`, {
        resultado,
        puntajeEquipoLocal,
        puntajeEquipoVisitante,
    });
};
