import { axiosInstance } from './config';

export const getUpcomingEvents = () => {
    return axiosInstance.get('/api/eventos/proximos');
};
