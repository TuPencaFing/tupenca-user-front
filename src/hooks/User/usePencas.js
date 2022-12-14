import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPencas } from '../../services/pencas';
import ROUTES from '../../utils/routes';

const usePencas = (search) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [pencas, setPencas] = useState([]);

    const handleJoinPenca = (pencaId) => {
        navigate(`${ROUTES.pencas}/${pencaId}/pago`);
    };

    useEffect(() => {
        setLoading(true);
        getPencas(search).then((response) => {
            console.log('Response of get pencas: ', response);
            const pencaResp = [];
            response.data.forEach((penca) => {
                pencaResp.push({
                    id: penca.id,
                    title: penca.title,
                    price: penca.costEntry,
                    bettingPool: penca.pozo,
                });
            })
            setPencas(pencaResp);
        }).catch((error) => {
            console.error('Error getting pencas: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [search]);

    return {loading, pencas, handleJoinPenca};
};

export default usePencas;
