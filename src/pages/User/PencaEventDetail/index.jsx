import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EventDetail from '../../../components/User/EventDetail';
import Navbar from '../../../components/Navbar';
import PencaDetailHeader from '../../../components/User/PencaDetailHeader';
import Spinner from '../../../components/Spinner';
import useEvent from '../../../hooks/User/useEvent';
import usePenca from '../../../hooks/User/usePenca';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../../utils/navbarItems';

const PencaEventDetail = () => {
    let params = useParams();
    const navigate = useNavigate();
    const {loading: loadingPenca, penca} = usePenca(params.pencaId);
    const {loading: loadingEvent, event, prediction, stats} = useEvent(params.pencaId, params.eventId);

    if (loadingPenca || loadingEvent) return <Spinner />;

    const redirectAfterSave = () => {
        navigate(`/pencas/${params.pencaId}/eventos`);
    };

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                routes={USER_ROUTES}
            />
            {penca ? (
                <PencaDetailHeader penca={penca} />
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

export default PencaEventDetail;
