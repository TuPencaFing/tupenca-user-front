import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import { getCompanyAdminRoutes } from '../../../utils/routes';
import './styles.scss';
import { useSelector } from "react-redux";

const CompanyAdministrationHeader = () => {
    let params = useParams();
    let location = useLocation();
    const navigate = useNavigate();
    const { company } = useSelector((state) => state.session);

    const classNamePage = (route) => {
        if (location.pathname === route) {
            return 'current-page-path';
        } else {
            return 'page-path';
        }
    };

    return (
        <header className="company-administration-header">
            <div className="company-administration-header-menu">
                <Button
                    key="company-administration-header-employees"
                    onClick={() => navigate(`${getCompanyAdminRoutes(params.companyCode).adminEmployees}`)}
                    className={classNamePage(`${getCompanyAdminRoutes(params.companyCode).adminEmployees}`)}
                >
                    Funcionarios
                </Button>
                {company.lookAndFeel !== 1 ? (
                    <Button
                        key="company-administration-header-configurations"
                        onClick={() => navigate(`${getCompanyAdminRoutes(params.companyCode).adminConfigurations}`)}
                        className={classNamePage(`${getCompanyAdminRoutes(params.companyCode).adminConfigurations}`)}
                    >
                        Configuración
                    </Button>
                ) : null}
            </div>
        </header>
    );
};

export default CompanyAdministrationHeader;
