import { axiosInstance } from "./config";

export const getParticipantsByPencaId = (pencaId) => {
    return axiosInstance.get(`/api/puntaje-usuario-penca/pencas/${pencaId}`);
};
