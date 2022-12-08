import React from 'react';
import { useParams } from 'react-router-dom';

import CompanyUserPencaDetailHeader from '../../../components/CompanyUser/CompanyUserPencaDetailHeader';
import Navbar from '../../../components/Navbar';
import ParticipantsList from '../../../components/ParticipantsList';
import Spinner from '../../../components/Spinner';
import useParticipants from '../../../hooks/useParticipants';
import useCompanyUserPenca from '../../../hooks/CompanyUser/useCompanyUserPenca';
import { COMPANY_USER_PAGES, USER_ROUTES } from '../../../utils/navbarItems';

const CompanyUserPencaParticipants = () => {
    let params = useParams();
    const {loading, penca} = useCompanyUserPenca(params.pencaId);
    const {participants} = useParticipants(params.pencaId);

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={COMPANY_USER_PAGES(params.companyCode)}
                routes={USER_ROUTES}
            />
            {penca ? (
                <CompanyUserPencaDetailHeader penca={penca} />
            ) : null}
            <ParticipantsList participants={participants} />
        </>
    );
};

export default CompanyUserPencaParticipants;
