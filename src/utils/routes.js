const ROUTES = {
    home: '/',
    login: '/login',
    logout: '/logout',
    register: '/registro',
    pencas: '/pencas',
    misPencas: '/mis-pencas',
    upcomingEvents: '/proximos-eventos',
    companyRegister: '/empresas/registro',
    companyAdmin: '/admin-empresas',
    invite: '/invitacion',
};

export const getCompanyRoutes = (companyCode) => {
    return {
        home: `${ROUTES.companyAdmin}/${companyCode}/`,
        login: `${ROUTES.companyAdmin}/${companyCode}/login`,
        logout: `${ROUTES.companyAdmin}/${companyCode}/logout`,
        pencas: `${ROUTES.companyAdmin}/${companyCode}/pencas`,
    };
};

export default ROUTES;