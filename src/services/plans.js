import { axiosInstance } from './config';

export const getPlans = () => {
    return axiosInstance.get('/api/planes');
};

export const getPlanById = (planId) => {
    return axiosInstance.get(`/api/planes/${planId}`);
};
