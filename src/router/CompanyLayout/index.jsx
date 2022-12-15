import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import ROUTES, { getCompanyAdminRoutes } from '../../utils/routes';
import { setBodyBackground, setBodyText } from "../../utils/colors";

const CompanyLayout = () => {
    const {isLogged, company, companyConfiguration} = useSelector((state) => state.session);

    if (!isLogged) {
        if (company !== null) {
            const COMPANY_ROUTES = getCompanyAdminRoutes(company.code);
            return (<Navigate to={COMPANY_ROUTES.login} replace />);
        }
        return (<Navigate to={ROUTES.login} replace />);
    } else if (company === null) {
        return (<Navigate to={ROUTES.misPencas} replace />);
    }
    if (companyConfiguration) {
        setBodyText(companyConfiguration.generalText);
        setBodyBackground(companyConfiguration.generalBackground);
    }
    return <Outlet />;
};

export default CompanyLayout;
