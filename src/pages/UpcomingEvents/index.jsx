import React from 'react';

import EventsList from '../../components/EventsList';
import Navbar from '../../components/Navbar';
import Spinner from '../../components/Spinner';
import useUpcomingEvents from '../../hooks/useUpcomingEvents';

const UpcomingEvents = () => {
    const {loading, events} = useUpcomingEvents();

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar />
            {events && events.length > 0 ? (
                <EventsList events={events} />
            ) : (
                <>
                    No hay eventos
                </>
            )}
        </>
    );
};

export default UpcomingEvents;
