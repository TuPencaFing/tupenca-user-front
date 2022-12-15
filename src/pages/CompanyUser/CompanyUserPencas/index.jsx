import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../../components/Navbar';
import PencaList from '../../../components/User/PencaList';
import Spinner from '../../../components/Spinner';
import useCompanyUserPencas from '../../../hooks/CompanyUser/useCompanyUserPencas';
import { COMPANY_USER_PAGES, USER_ROUTES } from '../../../utils/navbarItems';
import { getCompanyRoutes } from '../../../utils/routes';
import useLookAndFeel from '../../../hooks/Company/useLookAndFeel';

const CompanyUserPencas = () => {
    let params = useParams();
    const navigate = useNavigate();
    useLookAndFeel(params.companyCode);
    const {loading, pencas} = useCompanyUserPencas(params.companyCode);

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
