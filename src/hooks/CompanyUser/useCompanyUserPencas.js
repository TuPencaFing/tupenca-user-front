import { useEffect, useState } from 'react';

import { getPencas } from '../../services/companyPencas';

const useCompanyUserPencas = () => {
    const [loading, setLoading] = useState(false);
    const [pencas, setPencas] = useState([]);

    useEffect(() => {
        setLoading(true);
        getPencas().then((response) => {
            console.log('Response of get pencas empresariales: ', response);
            const pencaResp = [];
            response.data.forEach((penca) => {
                pencaResp.push({
                    id: penca.id,
                    title: penca.title,
                });
            })
            setPencas(pencaResp);
        }).catch((error) => {
            console.error('Error getting pencas empresariales: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, pencas};
};

export default useCompanyUserPencas;
