import { axiosInstance } from './config';

export const getCommentsByPencaId = (pencaId) => {
    return axiosInstance.get(`/api/foros`, {
        params: {
            pencaId: pencaId,
        }
    })
};

export const saveComment = (pencaId, message) => {
    return axiosInstance.post(`/api/foros`, {
        pencaId,
        message,
    })
};
