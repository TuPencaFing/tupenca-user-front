import { axiosInstance } from './config';
import { store } from '../app/store';

export const savePrediction = (eventId, data) => {
    const { resultado, puntajeEquipoLocal, puntajeEquipoVisitante } = data;
    return axiosInstance.post(`/api/eventos/${eventId}/prediccion`, {
        resultado,
        puntajeEquipoLocal,
        puntajeEquipoVisitante,
    });
};

export const getChampionships = () => {
    return axiosInstance.get('/api/campeonatos');
};

export const getPrizes = () => {
    const token = store.getState().session.token;
    return axiosInstance.get(`/api/premios`, {
        headers: { Authorization: `Bearer ${token}` 
    }});
};
