import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getPencaById, joinPenca } from '../../services/pencas';
import ROUTES from '../../utils/routes';
import './styles.scss';

const PaymentForm = () => {
    const navigate = useNavigate();
    let params = useParams();

    const renderCardPaymentBrick = async (bricksBuilder, penca) => {
        const settings = {
            initialization: {
                amount: penca.costEntry, // monto a ser pago
            },
            callbacks: {
                onReady: () => {
                    // callback llamado cuando Brick esté listo
                },
                onSubmit: (cardFormData) => {
                    // callback llamado cuando el usuario haga clic en el botón enviar los datos
                    console.log(cardFormData);

                    // ejemplo de envío de los datos recolectados por el Brick a su servidor
                    return new Promise((resolve, reject) => {
                        joinPenca(params.pencaId, cardFormData).then((response) => {
                            // recibir el resultado del pago
                            console.log('Response of join penca: ', response);
                            navigate(ROUTES.misPencas);
                            resolve();
                        }).catch((error) => {
                            // tratar respuesta de error al intentar crear el pago
                            console.error('Error joining penca: ', error);
                            reject();
                        });

                        // fetch("/process_payment", {
                        //     method: "POST",
                        //     headers: {
                        //         "Content-Type": "application/json",
                        //     },
                        //     body: JSON.stringify(cardFormData)
                        // })
                        //     .then((response) => {
                        //         // recibir el resultado del pago
                        //         resolve();
                        //     })
                        //     .catch((error) => {
                        //         // tratar respuesta de error al intentar crear el pago
                        //         reject();
                        //     })
                    });
                },
                onError: (error) => {
                    // callback llamado para todos los casos de error de Brick
                },
            },
        };
        await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
    };

    useEffect(() => {
        const mercadopago = new window.MercadoPago(process.env.REACT_APP_MERCADO_LIBRE_API_KEY);
        const bricksBuilder = mercadopago.bricks();
        getPencaById(params.pencaId).then((response) => {
            console.log('Response of get penca by ID: ', response);
            renderCardPaymentBrick(bricksBuilder, response.data);
        }).catch((error) => {
            console.error('Error getting penca by ID: ', error);
        });
    }, [params.pencaId, renderCardPaymentBrick]);

    return (
        <>
            <div id="cardPaymentBrick_container" className="card-payment-brick-container"></div>
        </>
    );
};

export default PaymentForm;
