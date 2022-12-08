import ROUTES, { getCompanyAdminRoutes } from './routes';

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
        name: 'Premios',
        route: null,
    },
];

export const EMPLOYEE_PAGES = [];

export const EMPLOYEE_LOGGED_PAGES = (companyCode) => {

    return [
        {
            name: 'Administración de pencas',
            route: getCompanyAdminRoutes(companyCode).pencas,
        },
        {
            name: 'Administración de funcionarios',
            route:  getCompanyAdminRoutes(companyCode).funcionarios,
        },
        {
            name: 'Administración de la empresa',
            route:  getCompanyAdminRoutes(companyCode).administracion,
        },
    ];
};

export const USER_ROUTES = {
    loginUrl: ROUTES.login,
    logoutUrl: ROUTES.logout,
};

export const EMPLOYEE_ROUTES = (companyCode) => {
    const routes = getCompanyAdminRoutes(companyCode);
    return {
        loginUrl: routes.login,
        logoutUrl: routes.logout,
    };
};
