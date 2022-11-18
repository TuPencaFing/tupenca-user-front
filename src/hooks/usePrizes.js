import { useEffect, useState } from 'react';

import { getPrizes } from '../services/events';

const usePrizes = () => {
    const [loading, setLoading] = useState(false);
    const [prizes, setPrizes] = useState([]);

    useEffect(() => {
        setLoading(true);
        getPrizes().then((response) => {
            const prizesResp = [];
            response.data.forEach((prize) => {
                prizesResp.push({
                    id: prize.id,
                    label: prize.position + ": " + prize.percentage + "%"
                });
            })
            setPrizes(prizesResp);
        }).catch((error) => {
            console.error('Error getting prizes: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, prizes};
};

export default usePrizes;
