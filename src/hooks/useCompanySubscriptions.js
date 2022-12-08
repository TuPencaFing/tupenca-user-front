import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCompanySubscriptions } from '../services/companies';

const useCompanySubscriptions = () => {
    const [loading, setLoading] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCompanySubscriptions().then((response) => {
            const subscriptionsResp = [];
            response.data.forEach((subscription) => {
                subscriptionsResp.push({
                    id: subscription.id,
                    cantUser: subscription.cantUser,
                    percentageCost: subscription.percentageCost,
                    cantPencas: subscription.cantPencas
                });
            })
            setSubscriptions(subscriptionsResp);
        }).catch((error) => {
            console.error('Error getting company subscriptions: ', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return {loading, subscriptions};
};

export default useCompanySubscriptions;
