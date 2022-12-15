import { axiosInstance } from './config';

export const getLookAndFeel = (companyCode) => {
    return axiosInstance.get(`/api/lookandfeel/${companyCode}`);
};

export const setLookAndFeel = (data) => {
    const { generalText, generalBackground, navbarText, navbarBackground } = data;
    return axiosInstance.put('/api/lookandfeel', {
        generaltext: generalText ?? null,
        generalbackground: generalBackground ?? null,
        textnavbar: navbarText ?? null,
        navbar: navbarBackground ?? null,
    });
};
