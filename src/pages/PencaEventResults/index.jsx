import React from 'react';
import { useParams } from 'react-router-dom';

import EventsList from '../../components/EventsList';
import EventScore from '../../components/EventScore';
import Navbar from '../../components/Navbar';
import PencaDetailHeader from '../../components/PencaDetailHeader';
import Spinner from '../../components/Spinner';
import usePenca from '../../hooks/usePenca';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../utils/navbarItems';
import './styles.scss';

const PencaEventResults = () => {
    let params = useParams();
    const {loading, penca, events} = usePenca(params.pencaId);

    if (loading) return <Spinner />;

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
                    />
                </>
            ) : (
                <>
                    No hay eventos
                </>
            )}
        </>
    );
};

export default PencaEventResults;
