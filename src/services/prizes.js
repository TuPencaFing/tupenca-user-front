import axios from 'axios';
import { axiosInstance } from './config';
import { getChampionships } from './championships';

export const getPrizes = () => {
    return axiosInstance.get('/api/premios');
};

export const getChampionshipsAndPrices = () => {
    return axios.all([
        getChampionships(),
        getPrizes(),
    ]).then(axios.spread((championshipsResponse, prizesResponse) => {
        return {
            data: {
                championships: championshipsResponse.data,
                prizes: prizesResponse.data,
            },
        };
    }));
};
