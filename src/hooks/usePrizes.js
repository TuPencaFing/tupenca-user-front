import { useEffect, useState } from 'react';

import { getPrizesByUserId } from '../services/prizes';

const usePrizes = (userId) => {
    const [loading, setLoading] = useState(false);
    const [prizes, setPrizes] = useState([]);

    useEffect(() => {
        setLoading(true);
        getPrizesByUserId(userId).then((response) => {
            console.log('Response of get prizes: ', response);
            setPrizes(response.data);
        }).catch((error) => {
            console.error('Error getting prizes: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [userId]);

    return {loading, prizes};
};

export default usePrizes;
