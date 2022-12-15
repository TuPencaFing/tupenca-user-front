import { axiosInstance } from './config';

export const createScore = (data) => {
    const { result, exactResult } = data;
    return axiosInstance.post('/api/puntajes', {
        resultado: result,
        resultadoExacto: exactResult,
    });
};
