import { useEffect, useState } from 'react';

import { getUpcomingEvents, savePrediction } from '../services/events';

const useUpcomingEvents = () => {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    const updateResult = (eventId, result) => {
        console.log('update result: ', eventId, result);
        const newList = events.map((event) => {
            if (event.id === eventId) {
                return {
                    ...event,
                    prediccion: {
                        ...event.prediccion,
                        prediccion: result,
                    },
                };
            }
            return event;
        });
        setEvents(newList);
    };

    const updateLocalScore = (eventId, score) => {
        console.log('update local score: ', eventId, score);
        const newList = events.map((event) => {
            if (event.id === eventId) {
                return {
                    ...event,
                    prediccion: {
                        ...event.prediccion,
                        puntajeEquipoLocal: score,
                    },
                };
            }
            return event;
        });
        setEvents(newList);
    };

    const updateVisitorScore = (eventId, score) => {
        console.log('update visitor score: ', eventId, score);
        const newList = events.map((event) => {
            if (event.id === eventId) {
                return {
                    ...event,
                    prediccion: {
                        ...event.prediccion,
                        puntajeEquipoVisitante: score,
                    },
                };
            }
            return event;
        });
        setEvents(newList);
    };

    const handleSavePrediction = (eventId) => {
        const event = events.find(event => event.id === eventId);
        const { prediccion, puntajeEquipoLocal, puntajeEquipoVisitante } = event.prediccion;
        const data = {
            resultado: prediccion,
            puntajeEquipoLocal,
            puntajeEquipoVisitante,
        };
        savePrediction(eventId, data).then((response) => {
            console.log('Response of save prediction: ', response);
        }).catch((error) => {
            console.log('Error saving prediction: ', error);
        });
    };

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

    return {loading, events, updateResult, updateLocalScore, updateVisitorScore, handleSavePrediction};
};

export default useUpcomingEvents;
