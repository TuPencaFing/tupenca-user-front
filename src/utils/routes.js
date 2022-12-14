const ROUTES = {
    home: '/',
    login: '/login',
    logout: '/logout',
    register: '/registro',
    forgotPassword: '/olvide-mi-password',
    resetPassword: '/restablecer-password',
    prizes: '/premios',
    prizesToBeClaimed: '/premios/para-reclamar',
    prizesAlreadyClaimed: '/premios/reclamados',
    pencas: '/pencas',
    misPencas: '/mis-pencas',
    companies: '/empresas',
    companyPlans: '/empresas/planes',
    companyAdmin: '/admin-empresas',
    invite: '/invitacion',
};

export const getCompanyRoutes = (companyCode, pencaId = null) => {
    return {
        home: `${ROUTES.companies}/${companyCode}/`,
        pencas: `${ROUTES.companies}/${companyCode}/pencas`,
        pencaEvents: `${ROUTES.companies}/${companyCode}/pencas/${pencaId}/eventos`,
        pencaParticipants: `${ROUTES.companies}/${companyCode}/pencas/${pencaId}/participantes`,
        pencaForum: `${ROUTES.companies}/${companyCode}/pencas/${pencaId}/foro`,
    };
};

export const getCompanyAdminRoutes = (companyCode, pencaId = null) => {
    return {
        home: `${ROUTES.companyAdmin}/${companyCode}/`,
        login: `${ROUTES.companyAdmin}/${companyCode}/login`,
        logout: `${ROUTES.companyAdmin}/${companyCode}/logout`,
        pencas: `${ROUTES.companyAdmin}/${companyCode}/pencas`,
        pencasCreate: `${ROUTES.companyAdmin}/${companyCode}/pencas/crear`,
        pencaUsers: `${ROUTES.companyAdmin}/${companyCode}/pencas/${pencaId}/usuarios`,
        pencaUserInvite: `${ROUTES.companyAdmin}/${companyCode}/pencas/${pencaId}/usuarios/invitar`,
    };
};

export default ROUTES;
