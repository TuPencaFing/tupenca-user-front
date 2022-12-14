import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import Navbar from '../../components/Navbar';
import { forgotPassword } from '../../services/users';
import { USER_PAGES, USER_ROUTES } from '../../utils/navbarItems';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = (values) => {
        console.log('Request forgot password: ', values);
        forgotPassword(values).then((response) => {
            console.log('Response forgot password', response);
            navigate('/login', {
                state: {
                    forgotPassword: true,
                },
            });
        }).catch((error) => {
            console.log('Error forgot password: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al solicitar un cambio de contraseña. Inténtelo nuevamente en unos minutos.',
            });
        });
    };

    return (
        <>
            <Navbar
                pages={USER_PAGES}
                routes={USER_ROUTES}
            />
            <ForgotPasswordForm
                feedbackMessage={feedbackMessage}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default ForgotPassword;
