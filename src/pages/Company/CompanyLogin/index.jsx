import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../../components/Navbar';
import LoginForm from '../../../components/LoginForm';
import { setCompanySession } from '../../../features/session/sessionSlice';
import { logIn } from '../../../services/employees';
import { EMPLOYEE_PAGES } from '../../../utils/navbarItems';

const CompanyLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let params = useParams();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = async (values) => {
        console.log('Request to login: ', values);
        logIn(values).then((response) => {
            console.log('Response login: ', response);
            const { token } = response.data;
            dispatch(setCompanySession({
                token,
                companyCode: params.companyCode,
            }));
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
                pages={EMPLOYEE_PAGES}
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
