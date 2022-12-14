import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import PrizeBillingInfoForm from '../../components/PrizeBillingInfoForm';
import { setPrizeBillingInfo } from '../../services/prizes';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../utils/navbarItems';
import ROUTES from '../../utils/routes';

const PrizeDetail = () => {
    let params = useParams();
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = (values) => {
        console.log('request prize billing info', values);
        const data = {
            ...values,
            prizeId: params.prizeId,
        };
        setPrizeBillingInfo(data).then((response) => {
            console.log('Response set prize billing info: ', response);
            navigate(ROUTES.prizesToBeClaimed);
        }).catch((error) => {
            console.error('Error setting prize billing info: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'No se ha podido establecer sus datos de facturación. Inténtelo nuevamente en unos minutos',
            });
        });
    };

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                routes={USER_ROUTES}
            />
            <PrizeBillingInfoForm
                feedbackMessage={feedbackMessage}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default PrizeDetail;
