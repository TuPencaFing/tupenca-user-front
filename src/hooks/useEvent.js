import { useEffect, useState } from 'react';

import { getEventAndStatsByPencaIdAndEventId } from '../services/events';

const useEvent = (pencaId, eventId) => {
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState(null);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        setLoading(true);
        getEventAndStatsByPencaIdAndEventId(pencaId, eventId).then((response) => {
            console.log('Response of get event info and stats: ', response);
            const { event: eventResponse, stats: statsResponse } = response.data;
            // Event
            const {
                id,
                equipoLocal: localTeam,
                equipoVisitante: visitorTeam,
                isEmpateValid: isTieValid,
                isPuntajeEquipoValid: isScoreValid,
            } = eventResponse;
            const eventDto = {
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
            // Stats
            const {
                porcentajeEmpate: tiePercentage,
                porcentajeLocal: localVictoryPercentage,
                porcentajeVisitante: visitorVictoryPercentage,
            } = statsResponse;
            const statsDto = {
                tiePercentage,
                localVictoryPercentage,
                visitorVictoryPercentage
            };
            // setters
            setEvent(eventDto);
            setStats(statsDto);
        }).catch((error) => {
            console.error('Error getting event info and stats: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [pencaId, eventId]);

    return {loading, event, stats};
};

export default useEvent;
