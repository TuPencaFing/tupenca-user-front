import { axiosInstance } from './config';

export const getChampionships = () => {
    return axiosInstance.get('/api/campeonatos');
};
