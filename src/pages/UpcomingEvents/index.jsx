import React from 'react';

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
                <>
                    aparecieron los eventos
                </>
            ) : (
                <>
                    No hay eventos
                </>
            )}
        </>
    );
};

export default UpcomingEvents;
