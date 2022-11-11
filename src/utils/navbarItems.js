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
        name: 'Empresas',
        submenu: true,
        route: null,
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
            name: 'Administración de pencas',
            route: getCompanyRoutes(companyCode).pencas,
        },
        {
            name: 'Administración de funcionarios',
            route:  getCompanyRoutes(companyCode).funcionarios,
        },
        {
            name: 'Administración de la empresa',
            route:  getCompanyRoutes(companyCode).administracion,
        },
    ];
};

export const USERS_SETTINGS = [
    {
        id: 1,
        name: 'Cerrar sesión',
        route: ROUTES.logout,
    }
];

export const EMPLOYEE_SETTINGS = (companyCode) => {

    return [
        {
            id: 1,
            name: 'Cerrar sesión',
            route: getCompanyRoutes(companyCode).logout,
        }
    ];
};
