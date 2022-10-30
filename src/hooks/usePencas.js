import { useEffect, useState } from 'react';

import { getPencas, joinPenca } from '../services/pencas';

const usePencas = () => {
    const [loading, setLoading] = useState(false);
    const [pencas, setPencas] = useState([]);

    const handleJoinPenca = (pencaId) => {
        joinPenca(pencaId).then((response) => {
            console.log('Response of join penca: ', response);
            const newPencas = pencas.filter((penca) => penca.id !== pencaId);
            setPencas(newPencas);
        }).catch((error) => {
            console.error('Error joining penca: ', error);
        });
    };

    useEffect(() => {
        setLoading(true);
        getPencas().then((response) => {
            console.log('Response of get pencas: ', response);
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
            console.error('Error getting pencas: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, pencas, handleJoinPenca};
};

export default usePencas;
