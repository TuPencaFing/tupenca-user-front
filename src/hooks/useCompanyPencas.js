import { useEffect, useState } from 'react';

import { getCompanyPencas } from '../services/pencas';

const useCompanyPencas = () => {
    const [loading, setLoading] = useState(false);
    const [pencas, setPencas] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCompanyPencas().then((response) => {
            console.log('Response of get company pencas: ', response);
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
            console.error('Error getting company pencas: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, pencas};
};

export default useCompanyPencas;
