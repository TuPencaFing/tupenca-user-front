import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyUserPencaDetailHeader from '../../../components/CompanyUser/CompanyUserPencaDetailHeader';
import EventsList from '../../../components/User/EventsList';
import EventScore from '../../../components/EventScore';
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import useCompanyUserPenca from '../../../hooks/CompanyUser/useCompanyUserPenca';
import { COMPANY_USER_PAGES, USER_ROUTES } from "../../../utils/navbarItems";
import { getCompanyRoutes } from '../../../utils/routes';
import './styles.scss';

const CompanyUserPencaEvents = () => {
    let params = useParams();
    const navigate = useNavigate();
    const {loading, penca, events} = useCompanyUserPenca(params.pencaId);

    if (loading) return <Spinner />;

    const handleClickEvent = (eventId) => {
        navigate(`${getCompanyRoutes(params.companyCode, params.pencaId).pencaEvents}/${eventId}`);
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
            {(events && events.length > 0) ? (
                <>
                    <div className="company-user-penca-events-list-header">
                        <EventScore score={`${penca.totalScore} pts`} />
                    </div>
                    <EventsList
                        events={events}
                        handleClickEvent={handleClickEvent}
                    />
                </>
            ) : (
                <div className="company-user-penca-events-list-empty">
                    La penca aún no tiene ningún evento del que puedas participar. Vuelve más tarde!
                </div>
            )}
        </>
    );
};

export default CompanyUserPencaEvents;
