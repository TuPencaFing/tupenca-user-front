import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../../components/Navbar';
import PencaList from '../../../components/PencaList';
import Spinner from '../../../components/Spinner';
import useCompanyUserPencas from '../../../hooks/CompanyUser/useCompanyUserPencas';
import { COMPANY_USER_PAGES, USER_ROUTES } from '../../../utils/navbarItems';
import { getCompanyRoutes } from '../../../utils/routes';

const CompanyUserPencas = () => {
    let params = useParams();
    const navigate = useNavigate();
    const {loading, pencas} = useCompanyUserPencas();

    const handleClickPenca = (pencaId) => {
        navigate(getCompanyRoutes(params.companyCode, pencaId).pencaEvents);
    };

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={COMPANY_USER_PAGES(params.companyCode)}
                routes={USER_ROUTES}
            />
            <PencaList
                pencas={pencas}
                handleClickPenca={handleClickPenca}
            />
        </>
    );
};

export default CompanyUserPencas;
