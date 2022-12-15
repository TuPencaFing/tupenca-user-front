import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EventsList from '../../../components/User/EventsList';
import EventScore from '../../../components/EventScore';
import Navbar from '../../../components/Navbar';
import PencaDetailHeader from '../../../components/User/PencaDetailHeader';
import Spinner from '../../../components/Spinner';
import usePenca from '../../../hooks/User/usePenca';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../../utils/navbarItems';
import ROUTES from '../../../utils/routes';
import './styles.scss';

const PencaEventResults = () => {
    let params = useParams();
    const navigate = useNavigate();
    const {loading, penca, events} = usePenca(params.pencaId);

    if (loading) return <Spinner />;

    const handleClickEvent = (eventId) => {
        navigate(`${ROUTES.pencas}/${params.pencaId}/eventos/${eventId}`);
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
            {(events && events.length > 0) ? (
                <>
                    <div className="events-list-header">
                        <EventScore score={`${penca.totalScore} pts`} />
                    </div>
                    <EventsList
                        events={events}
                        handleClickEvent={handleClickEvent}
                    />
                </>
            ) : (
                <div className="events-list-empty">
                    La penca aún no tiene ningún evento del que puedas participar. Vuelve más tarde!
                </div>
            )}
        </>
    );
};

export default PencaEventResults;
