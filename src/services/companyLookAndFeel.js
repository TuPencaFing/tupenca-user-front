import { axiosInstance } from './config';

export const getLookAndFeel = (companyCode) => {
    return axiosInstance.get(`/api/lookandfeel/${companyCode}`);
};

export const setLookAndFeel = (data) => {
    const { generalText, generalBackground, navbarText, navbar } = data;
    return axiosInstance.put('/api/lookandfeel', {
        generaltext: generalText,
        generalbackground: generalBackground,
        textnavbar: navbarText,
        navbar: navbar,
    });
};
