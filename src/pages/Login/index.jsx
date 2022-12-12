import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';

import Navbar from '../../components/Navbar';
import LoginForm from '../../components/LoginForm';
import { setSession } from '../../features/session/sessionSlice';
import { logIn, signInWithGoogle } from '../../services/users';
import { USER_PAGES, USER_ROUTES } from '../../utils/navbarItems';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = async (values) => {
        console.log('Request to login: ', values);
        logIn(values).then((response) => {
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

    const onSuccessGoogle = (res) => {
        console.log('onSuccessGoogle:', res);
        const values = {
            accessToken: res.accessToken,
        };
        console.log('access token', res.accessToken);
        signInWithGoogle(values).then((response) => {
            console.log('Response social login: ', response);
            const { token } = response.data;
            dispatch(setSession({ token }));
            navigate('/');
        }).catch((error) => {
            console.log('Error social login: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'No se logró ingresar con su cuenta de Google. Inténtenlo nuevamente en unos minutos',
            });
        });
    };

    const onFailureGoogle = (err) => {
        console.log('onFailureGoogle:', err);
        setFeedbackMessage({
            type: 'error',
            message: 'No se logró ingresar con su cuenta de Google. Inténtenlo nuevamente en unos minutos',
        });
    };

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    }, []);

    return (
        <>
            <Navbar
                pages={USER_PAGES}
                routes={USER_ROUTES}
            />
            <LoginForm
                isCompany={false}
                feedbackMessage={feedbackMessage}
                onSubmit={handleSubmit}
                onSuccessGoogle={onSuccessGoogle}
                onFailureGoogle={onFailureGoogle}
            />
        </>
    );
};

export default Login;
