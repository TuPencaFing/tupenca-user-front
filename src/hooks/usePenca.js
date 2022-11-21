import { useEffect, useState } from 'react';

import { getPencaInfoById } from '../services/pencas';

const usePencas = (pencaId) => {
    const [loading, setLoading] = useState(false);
    const [penca, setPenca] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setLoading(true);
        getPencaInfoById(pencaId).then((response) => {
            console.log('Response of get penca info: ', response);
            const {
                id,
                pencaTitle: title,
                pencaDescription: description,
                image,
                puntajeTotal: totalScore,
                campeonatoName: championshipName,
                deporte,
                eventos,
            } = response.data;
            const { nombre: sportName } = deporte;
            const pencaResp = {
                id,
                title,
                description,
                image,
                totalScore,
                championshipName,
                sportName,
            };
            setPenca(pencaResp);
            setEvents(eventos);
        }).catch((error) => {
            console.error('Error getting penca info: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [pencaId]);

    return {loading, penca, events};
};

export default usePencas;
