import { useEffect, useState } from 'react';

import { getParticipantsByPencaId } from '../services/pencas';

const useParticipants = (pencaId) => {
    const [loading, setLoading] = useState(false);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        setLoading(true);
        getParticipantsByPencaId(pencaId).then((response) => {
            console.log('Response of get participants: ', response);
            const participants = response.data;
            participants.sort((left, right) => right.score - left.score);
            setParticipants(participants);
        }).catch((error) => {
            console.error('Error getting participants: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [pencaId]);

    return {loading, participants};
};

export default useParticipants;
