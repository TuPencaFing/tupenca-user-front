import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import { resetPassword } from '../../services/users';
import { USER_PAGES, USER_ROUTES } from '../../utils/navbarItems';

const ResetPassword = () => {
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = (values) => {
        console.log('Request reset password: ', values, searchParams.get('token'));
        resetPassword(values).then((response) => {
            console.log('Response reset password', response);
            navigate('/login', {
                state: {
                    resetPassword: true,
                },
            });
        }).catch((error) => {
            console.log('Error reset password: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al establecer la contraseña. Inténtelo en unos minutos o inicie el proceso nuevamente.',
            });
        });
    };

    return (
        <>
            <Navbar
                pages={USER_PAGES}
                routes={USER_ROUTES}
            />
            <ResetPasswordForm
                feedbackMessage={feedbackMessage}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default ResetPassword;
