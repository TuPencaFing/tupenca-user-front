import { useEffect, useState } from 'react';

import { getChampionshipsAndPrices } from '../../services/prizes';

const usePencaCreate = () => {
    const [loading, setLoading] = useState(false);
    const [championships, setChampionships] = useState(null);
    const [prizes, setPrizes] = useState(null);

    useEffect(() => {
        setLoading(true);
        getChampionshipsAndPrices().then((response) => {
            console.log('Response of get championships and prizes: ', response);
            const { championships: championshipsData, prizes: prizesData } = response.data;
            // Championships
            const championshipsResponse = [];
            championshipsData.forEach((championship) => {
                championshipsResponse.push({
                    id: championship.id,
                    name: championship.name,
                });
            });

            // Prizes
            const prizesResponse = [];
            prizesData.forEach((prize) => {
                prizesResponse.push({
                    id: prize.id,
                    position: prize.position,
                    percentage: prize.percentage,
                });
            });
            // setters
            setChampionships(championshipsResponse);
            setPrizes(prizesResponse);
        }).catch((error) => {
            console.error('Error getting championships and prizes: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, championships, prizes};
};

export default usePencaCreate;
