import ROUTES, { getCompanyRoutes } from './routes';

export const USER_PAGES = [
    {
        name: 'Pencas',
        route: ROUTES.home,
    },
];

export const USER_LOGGED_PAGES = [
    {
        name: 'Pencas',
        route: ROUTES.pencas,
    },
    {
        name: 'Mis pencas',
        route: ROUTES.misPencas,
    },
    {
        name: 'Próximos eventos',
        route: ROUTES.upcomingEvents,
    },
    {
        name: 'Foro',
        route: null,
    },
    {
        name: 'Premios',
        route: null,
    },
];

export const EMPLOYEE_PAGES = [];

export const EMPLOYEE_LOGGED_PAGES = (companyCode) => {

    return [
        {
            name: 'Administrar penca',
            route: getCompanyRoutes(companyCode).pencas,
        },
        {
            name: 'Administrar funcionarios',
            route: null,
        },
        {
            name: 'Configuración de mi empresa',
            route: null,
        },
    ];
};

export const USER_ROUTES = {
    loginUrl: ROUTES.login,
    logoutUrl: ROUTES.logout,
};

export const EMPLOYEE_ROUTES = (companyCode) => {
    const routes = getCompanyRoutes(companyCode);
    return {
        loginUrl: routes.login,
        logoutUrl: routes.logout,
    };
};
