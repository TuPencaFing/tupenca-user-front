import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCompany } from '../services/companies';

const useCompany = () => {
    const { companyCode } = useParams();
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState('');
    const [plan, setPlan] = useState('');

    useEffect(() => {
        setLoading(true);
        getCompany(companyCode).then((response) => {
            setCompany(response.data);
            setPlan(response.data.plan);
        }).catch((error) => {
            console.error('Error getting company: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, company, plan};
};

export default useCompany;
