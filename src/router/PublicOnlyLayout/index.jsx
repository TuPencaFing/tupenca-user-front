import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import ROUTES, { getCompanyAdminRoutes } from '../../utils/routes';
import { setBodyBackground, setBodyText } from "../../utils/colors";

const PublicOnlyLayout = () => {
    const {isLogged, company} = useSelector((state) => state.session);

    if (isLogged) {
        if (company !== null) {
            const COMPANY_ROUTES = getCompanyAdminRoutes(company.code);
            return (<Navigate to={COMPANY_ROUTES.home} replace />);
        }
        return (<Navigate to={ROUTES.misPencas} replace />);
    }
    setBodyText(null);
    setBodyBackground(null);
    return <Outlet />;
};

export default PublicOnlyLayout;
