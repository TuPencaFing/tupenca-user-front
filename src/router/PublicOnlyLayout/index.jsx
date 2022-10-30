import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import ROUTES, { getCompanyRoutes } from "../../utils/routes";

const PublicOnlyLayout = () => {
    const {isLogged, company} = useSelector((state) => state.session);

    if (isLogged) {
        if (company !== null) {
            const COMPANY_ROUTES = getCompanyRoutes(company.code);
            return (<Navigate to={COMPANY_ROUTES.home} replace />);
        }
        return (<Navigate to={ROUTES.misPencas} replace />);
    }
    return <Outlet />;
};

export default PublicOnlyLayout;
