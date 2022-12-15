import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import { getCompanyAdminRoutes } from '../../../utils/routes';
import './styles.scss';

const CompanyPencaHeader = () => {
    let params = useParams();
    let location = useLocation();
    const navigate = useNavigate();

    const classNamePage = (route) => {
        if (location.pathname === route) {
            return 'current-page-path';
        } else {
            return 'page-path';
        }
    };

    return (
        <header className="company-penca-header">
            <div className="company-penca-header-menu">
                <Button
                    key="company-penca-header-users"
                    onClick={() => navigate(`${getCompanyAdminRoutes(params.companyCode, params.pencaId).pencaUsers}`)}
                    className={classNamePage(`${getCompanyAdminRoutes(params.companyCode, params.pencaId).pencaUsers}`)}
                >
                    Usuarios
                </Button>
            </div>
        </header>
    );
};

export default CompanyPencaHeader;
