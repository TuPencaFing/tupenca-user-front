import React from 'react';

import EventsList from '../../components/EventsList';
import Navbar from '../../components/Navbar';
import Spinner from '../../components/Spinner';
import useUpcomingEvents from '../../hooks/useUpcomingEvents';
import { USER_LOGGED_PAGES, USERS_SETTINGS } from '../../utils/navbarItems';

const UpcomingEvents = () => {
    const {loading, events} = useUpcomingEvents();

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                settings={USERS_SETTINGS}
            />
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
