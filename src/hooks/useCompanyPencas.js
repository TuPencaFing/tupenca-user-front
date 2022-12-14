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
                const { id, title, description, campeonato: championship } = penca;
                for (let i = 0; i < 20; i++) {
                    pencaResp.push({
                        id,
                        title: title + i,
                        description,
                        championshipName: championship.name,
                    });
                }
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
