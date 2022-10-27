import { useEffect, useState } from 'react';
import { getUpcomingEvents } from "../services/events";

const useUpcomingEvents = () => {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setLoading(true);
        getUpcomingEvents().then((response) => {
            console.log('Response of get upcoming events: ', response);
            const eventsResp = [];
            response.data.forEach((event) => {
                const date = new Date(event.fechaInicial).toLocaleString("es-ES", {
                    timeZone: 'America/Montevideo',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
                eventsResp.push({
                    ...event,
                    date: date,
                });
            });
            eventsResp.sort(function(a, b) {
                return new Date(a.fechaInicial) - new Date(b.fechaInicial);
            });
            setEvents(eventsResp);
        }).catch((error) => {
            console.error('Error getting upcoming events: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, events};
};

export default useUpcomingEvents;
