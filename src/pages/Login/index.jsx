import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import LoginForm from '../../components/LoginForm';
import { setSession } from '../../features/session/sessionSlice';
import { logIn } from '../../services/users';
import { USER_PAGES } from '../../utils/navbarItems';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };
        console.log('Request to login: ', data);
        logIn(data).then((response) => {
            console.log('Response login: ', response);
            const { token } = response.data;
            dispatch(setSession({ token }));
            navigate('/');
        }).catch((error) => {
            console.log('Error login: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al intentar ingresar con su cuenta, inténtelo nuevamente.',
            });
        });
    };

    return (
        <>
            <Navbar
                pages={USER_PAGES}
            />
            <LoginForm
                feedbackMessage={feedbackMessage}
                handleSubmit={handleSubmit}
                isCompany={false}
            />
        </>
    );
};

export default Login;
