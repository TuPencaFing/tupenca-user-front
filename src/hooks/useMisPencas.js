import { useEffect, useState } from 'react';

import { getMyPencas } from '../services/pencas';

const useMisPencas = () => {
    const [loading, setLoading] = useState(false);
    const [pencas, setPencas] = useState([]);

    useEffect(() => {
        setLoading(true);
        getMyPencas().then((response) => {
            console.log('Response of get my pencas: ', response);
            const pencaResp = [];
            response.data.forEach((penca) => {
                pencaResp.push({
                    id: penca.id,
                    title: penca.title,
                    bettingPool: penca.pozo,
                });
            })
            setPencas(pencaResp);
        }).catch((error) => {
            console.error('Error getting my pencas: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, pencas};
};

export default useMisPencas;
