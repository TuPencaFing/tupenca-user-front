import { useEffect, useState } from 'react';
import { getUpcomingEvents } from "../services/events";

const useUpcomingEvents = () => {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setLoading(true);
        getUpcomingEvents().then((response) => {
            console.log('Response of get upcoming events: ', response);
            setEvents(response.data);
        }).catch((error) => {
            console.error('Error getting upcoming events: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, events};
};

export default useUpcomingEvents;
