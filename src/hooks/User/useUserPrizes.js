import { useEffect, useState } from 'react';

import { getPrizesByUserId } from '../../services/userPrizes';

const useUserPrizes = (userId, claimed) => {
    const [loading, setLoading] = useState(false);
    const [prizes, setPrizes] = useState([]);

    useEffect(() => {
        setLoading(true);
        getPrizesByUserId(userId, claimed).then((response) => {
            console.log('Response of get prizes: ', response);
            const prizesResp = [];
            response.data.forEach((prize) => {
                const { id, premio, penca } = prize;
                prizesResp.push({
                    id: id,
                    premio: premio,
                    pencaTitle: penca.title,
                    pencaImage: penca.image,
                });
            })
            setPrizes(prizesResp);
        }).catch((error) => {
            console.error('Error getting prizes: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [userId, claimed]);

    return {loading, prizes};
};

export default useUserPrizes;
