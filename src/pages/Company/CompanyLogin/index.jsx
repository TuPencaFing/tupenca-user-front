import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../../components/Navbar';
import LoginForm from '../../../components/User/LoginForm';
import { setCompanySession, setCompanyConfiguration } from '../../../features/session/sessionSlice';
import { getLookAndFeel } from '../../../services/companyLookAndFeel';
import { getCompanyByCode } from '../../../services/companies';
import { logIn } from '../../../services/employees';
import { EMPLOYEE_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';

const CompanyLogin = () => {
    let params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = async (values) => {
        console.log('Request to login: ', values);
        logIn(values).then((responseLogIn) => {
            console.log('Response login: ', responseLogIn);
            const { token } = responseLogIn.data;
            getCompanyByCode(params.companyCode).then((responseGetCompany) => {
                console.log('Response get company by code: ', responseGetCompany);
                dispatch(setCompanySession({
                    token,
                    company: responseGetCompany.data,
                }));
                getLookAndFeel(params.companyCode).then((responseLookAndFeel) => {
                    console.log('Response get look and feel: ', responseLookAndFeel);
                    const {
                        generaltext: generalText,
                        generalbackground: generalBackground,
                        textnavbar: navbarText,
                        navbar: navbarBackground,
                    } = responseLookAndFeel.data;
                    dispatch(setCompanyConfiguration({
                        generalText,
                        generalBackground,
                        navbarText,
                        navbarBackground,
                    }));
                }).catch((error) => {
                    console.log('Error getting look and feel: ', error);
                });
                navigate('/');
            }).catch((error) => {
                console.log('Error getting company by code: ', error);
                setFeedbackMessage({
                    type: 'error',
                    message: 'No se logr?? ingresar con su cuenta. Int??ntelo nuevamente en unos minutos.',
                });
            });
        }).catch((error) => {
            console.log('Error login: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'No se logr?? ingresar con su cuenta. Int??ntelo nuevamente en unos minutos.',
            });
        });
    };

    return (
        <>
            <Navbar
                pages={EMPLOYEE_PAGES}
                routes={EMPLOYEE_ROUTES(params.companyCode)}
            />
            <LoginForm
                feedbackMessage={feedbackMessage}
                onSubmit={handleSubmit}
                isCompany={true}
            />
        </>
    );
};

export default CompanyLogin;
