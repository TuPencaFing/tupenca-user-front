import { useEffect, useState } from 'react';

import { getEventById } from '../services/events';

const useEvent = (eventId) => {
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        setLoading(true);
        getEventById(eventId).then((response) => {
            console.log('Response of get event info: ', response);
            const {
                id,
                equipoLocal: localTeam,
                equipoVisitante: visitorTeam,
                isEmpateValid: isTieValid,
                isPuntajeEquipoValid: isScoreValid,
            } = response.data;
            const event = {
                id,
                localTeam: {
                    id: localTeam.id,
                    name: localTeam.nombre,
                    image: localTeam.image,
                },
                visitorTeam: {
                    id: visitorTeam.id,
                    name: visitorTeam.nombre,
                    image: visitorTeam.image,
                },
                isTieValid,
                isScoreValid,
            };
            setEvent(event);
        }).catch((error) => {
            console.error('Error getting event info: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [eventId]);

    return {loading, event};
};

export default useEvent;
