import { useEffect, useState } from 'react';

import { getCompanyPencas } from '../services/companyPencas';

const useCompanyPencas = (companyCode) => {
    const [loading, setLoading] = useState(false);
    const [pencas, setPencas] = useState([]);
    const [pencasCounter, setPencasCounter] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCompanyPencas(companyCode).then((response) => {
            console.log('Response of get company pencas: ', response);
            const { pencas: pencasList, pencasCounter: counter } = response.data;
            const pencaResp = [];
            pencasList.forEach((penca) => {
                const { id, title, description, image, campeonato: championship } = penca;
                pencaResp.push({
                    id,
                    title,
                    description,
                    image,
                    championshipName: championship.name,
                });
            })
            setPencas(pencaResp);
            setPencasCounter(counter.cantidad);
        }).catch((error) => {
            console.error('Error getting company pencas: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [companyCode]);

    return {loading, pencas, pencasCounter};
};

export default useCompanyPencas;
