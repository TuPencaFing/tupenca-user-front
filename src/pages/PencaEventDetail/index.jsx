import React from 'react';
import { useParams } from 'react-router-dom';

import EventDetail from '../../components/EventDetail';
import Navbar from '../../components/Navbar';
import PencaDetailHeader from '../../components/PencaDetailHeader';
import Spinner from '../../components/Spinner';
import useEvent from '../../hooks/useEvent';
import usePenca from '../../hooks/usePenca';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../utils/navbarItems';

const PencaEventDetail = () => {
    let params = useParams();
    const {loading: loadingPenca, penca} = usePenca(params.pencaId);
    const {loading: loadingEvent, event} = useEvent(params.eventId);

    if (loadingPenca || loadingEvent) return <Spinner />;

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
                <EventDetail event={event} />
            ) : null}
        </>
    );
};

export default PencaEventDetail;