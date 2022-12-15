import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyPencasTable from '../../../components/Company/CompanyPencasTable';
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import useCompanyPencas from '../../../hooks/useCompanyPencas';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import { getCompanyAdminRoutes } from '../../../utils/routes';

const CompanyPencas = () => {
    let params = useParams();
    const navigate = useNavigate();
    const {loading, pencas} = useCompanyPencas();

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
            <CompanyPencasTable
                pencas={pencas}
                handleClickPenca={handleClickPenca}
            />
        </>
    );
};

export default CompanyPencas;
