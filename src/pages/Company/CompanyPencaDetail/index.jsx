import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import Navbar from '../../../components/Navbar';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import { getCompanyAdminRoutes } from '../../../utils/routes';
import './styles.scss';

const CompanyPencaDetail = () => {
    const navigate = useNavigate();
    let params = useParams();

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                routes={EMPLOYEE_ROUTES(params.companyCode)}
            />
            <div className="invite-user" style={{ textAlign: 'center', marginTop: '16px' }}>
                <Button
                    className="invite-user-button"
                    variant="contained"
                    onClick={() => navigate(`${getCompanyAdminRoutes(params.companyCode).pencas}/${params.pencaId}/invitarUsuario`)}
                >
                    Invitar usuario
                </Button>
            </div>
        </>
    );
};

export default CompanyPencaDetail;
