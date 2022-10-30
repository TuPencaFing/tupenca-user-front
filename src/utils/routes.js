const ROUTES = {
    home: '/',
    login: '/login',
    logout: '/logout',
    register: '/registro',
    pencas: '/pencas',
    misPencas: '/mis-pencas',
    upcomingEvents: '/proximos-eventos',
    companies: '/empresas',
    companyRegister: '/empresas/registro',
};

export const getCompanyRoutes = (companyCode) => {
    return {
        home: `${ROUTES.companies}/${companyCode}/admin/`,
        login: `${ROUTES.companies}/${companyCode}/admin/login`,
        logout: `${ROUTES.companies}/${companyCode}/admin/logout`,
    };
};

export default ROUTES;
