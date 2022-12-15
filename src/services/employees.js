import { axiosInstance } from './config';

export const createEmployee = (data) => {
    const { email, username, password, companyId } = data;
    return axiosInstance.post('/api/funcionarios/register', {
        email,
        username,
        password,
        empresaId: companyId,
    });
};

export const logIn = (data) => {
    const { email, password } = data;
    return axiosInstance.post('/api/funcionarios/login', {
        email,
        password
    });
};

export const inviteUser = (data) => {
    const { email, pencaId } = data;
    return axiosInstance.post('/api/funcionarios/invitar', {
        email,
        pencaId,
    });
};

export const sendNews = (data) => {
    const { users, subject, body } = data;
    const userIds = [];
    users.forEach((user) => {
        userIds.push(user.id);
    });
    return axiosInstance.post('/api/funcionarios/enviarMensajes', {
        userIds,
        topic: subject,
        message: body,
    });
};

export const getEmployeesByCompanyId = (companyId) => {
    return axiosInstance.get(`/api/funcionarios/empresa/${companyId}`);
};
