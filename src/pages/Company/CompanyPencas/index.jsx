import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyPencaTable from '../../../components/Company/CompanyPencaTable';
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import useCompanyPencas from '../../../hooks/useCompanyPencas';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import { getCompanyAdminRoutes } from '../../../utils/routes';

const CompanyPencas = () => {
    let params = useParams();
    const {loading, pencas} = useCompanyPencas();

    const navigate = useNavigate();

    const handleClickPenca = (pencaId) => {
        navigate(`${getCompanyAdminRoutes(params.companyCode).pencas}/${pencaId}`);
    };

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                routes={EMPLOYEE_ROUTES(params.companyCode)}
            />
            <CompanyPencaTable
                pencas={pencas}
                handleClickPenca={handleClickPenca}
            />
        </>
    );
};

export default CompanyPencas;
