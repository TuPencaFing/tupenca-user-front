import React, { useEffect } from 'react';

import './styles.scss';
import Alert from "@mui/material/Alert";

const PaymentForm = ({ handleSubmit, amount, feedbackMessage }) => {

    const renderCardPaymentBrick = async (bricksBuilder) => {
        const settings = {
            initialization: {
                amount: amount, // monto a ser pago
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
                        handleSubmit(cardFormData).then(() => {
                            resolve();
                        }).catch(() => {
                            reject();
                        });
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
        renderCardPaymentBrick(bricksBuilder);
    }, [renderCardPaymentBrick]);

    return (
        <>
            {feedbackMessage ? (
                <div style={{ width: '40%', margin: '16px auto' }}>
                    <Alert severity={feedbackMessage.type}>
                        {feedbackMessage.message}
                    </Alert>
                </div>
            ) : null}
            <div id="cardPaymentBrick_container" className="card-payment-brick-container"></div>
        </>
    );
};

export default PaymentForm;
