import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyUserPencaDetailHeader from '../../../components/CompanyUser/CompanyUserPencaDetailHeader';
import EventDetail from '../../../components/User/EventDetail';
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import useCompanyUserEvent from '../../../hooks/CompanyUser/useCompanyUserEvent';
import useCompanyUserPenca from '../../../hooks/CompanyUser/useCompanyUserPenca';
import { COMPANY_USER_PAGES, USER_ROUTES } from '../../../utils/navbarItems';
import { getCompanyRoutes } from '../../../utils/routes';

const CompanyUserPencaEventDetail = () => {
    let params = useParams();
    const navigate = useNavigate();
    const {loading: loadingPenca, penca} = useCompanyUserPenca(params.pencaId);
    const {loading: loadingEvent, event, prediction, stats} = useCompanyUserEvent(params.pencaId, params.eventId);

    if (loadingPenca || loadingEvent) return <Spinner />;

    const redirectAfterSave = () => {
        navigate(getCompanyRoutes(params.companyCode, params.pencaId).pencaEvents);
    };

    return (
        <>
            <Navbar
                pages={COMPANY_USER_PAGES(params.companyCode)}
                routes={USER_ROUTES}
            />
            {penca ? (
                <CompanyUserPencaDetailHeader penca={penca} />
            ) : null}
            {event ? (
                <EventDetail
                    event={event}
                    prediction={prediction}
                    stats={stats}
                    redirectAfterSave={redirectAfterSave}
                />
            ) : null}
        </>
    );
};

export default CompanyUserPencaEventDetail;
