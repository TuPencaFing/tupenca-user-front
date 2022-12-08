import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import PaymentForm from '../../components/PaymentForm';
import { getPencaById, joinPenca } from '../../services/pencas';
import { USER_LOGGED_PAGES, USER_ROUTES } from '../../utils/navbarItems';
import ROUTES from '../../utils/routes';

const PencaPayment = () => {
    let params = useParams();
    const navigate = useNavigate();
    const [amount, setAmount] = useState(null);

    const handleSubmit = (cardFormData) => {
        joinPenca(params.pencaId, cardFormData).then((response) => {
            // recibir el resultado del pago
            console.log('Response of join penca: ', response);
            navigate(ROUTES.misPencas);
        }).catch((error) => {
            // tratar respuesta de error al intentar crear el pago
            console.error('Error joining penca: ', error);
        });
    };

    useEffect(() => {
        getPencaById(params.pencaId).then((response) => {
            console.log('Response of get penca by ID: ', response);
            const { costEntry } = response.data;
            setAmount(costEntry);
        }).catch((error) => {
            console.error('Error getting penca by ID: ', error);
        });
    }, [params.pencaId]);

    return (
        <>
            <Navbar
                pages={USER_LOGGED_PAGES}
                routes={USER_ROUTES}
            />
            {amount ? (
                <PaymentForm
                    handleSubmit={handleSubmit}
                    amount={amount}
                />
            ) : null}
        </>
    );
};

export default PencaPayment;
