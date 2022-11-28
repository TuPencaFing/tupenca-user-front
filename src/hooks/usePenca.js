import { useEffect, useState } from 'react';

import { getPencaInfoById } from '../services/pencas';

const usePenca = (pencaId) => {
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
            eventos.sort((event, rightEvent) => new Date(event.fechaInicial) - new Date (rightEvent.fechaInicial));
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

export default usePenca;
