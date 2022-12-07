import { useEffect, useState } from 'react';

import { getPlans } from '../services/plans';

const usePlans = () => {
    const [loading, setLoading] = useState(false);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        setLoading(true);
        getPlans().then((response) => {
            console.log('Response of get plans: ', response);
            setPlans(response.data);
        }).catch((error) => {
            console.error('Error getting plans: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, plans};
};

export default usePlans;
