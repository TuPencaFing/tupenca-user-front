import { useEffect, useState } from 'react';

import { getChampionships } from '../services/events';

const useChampionships = () => {
    const [loading, setLoading] = useState(false);
    const [championships, setChampionships] = useState([]);

    useEffect(() => {
        setLoading(true);
        getChampionships().then((response) => {
            const championshipsResp = [];
            response.data.forEach((championships) => {
                championshipsResp.push({
                    id: championships.id,
                    label: championships.name,
                });
            })
            setChampionships(championshipsResp);
        }).catch((error) => {
            console.error('Error getting championships: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, championships};
};

export default useChampionships;
