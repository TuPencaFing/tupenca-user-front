import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyPencaSendNewForm from '../../../components/Company/CompanyPencaSendNewsForm';
import Navbar from '../../../components/Navbar';
import { sendNews } from '../../../services/employees';
import { getPencaUsersList } from '../../../services/companyUsers';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import { getCompanyAdminRoutes } from '../../../utils/routes';

const CompanyPencaSendNews = () => {
    let params = useParams();
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = (values) => {
        console.log('Request to send news: ', values);
        getPencaUsersList(params.pencaId).then((usersResponse) => {
            console.log('Response get penca users: ', usersResponse);
            const data = {
                ...values,
                users: usersResponse.data,
            };
            sendNews(data).then((newsResponse) => {
                console.log('Response send news: ', newsResponse);
                navigate(getCompanyAdminRoutes(params.companyCode, params.pencaId).pencaUsers);
            }).catch((error) => {
                console.log('Error sending news: ', error);
                setFeedbackMessage({
                    type: 'error',
                    message: 'Ocurrió un error al enviar las novedades. Inténtelo nuevamente en unos minutos.',
                });
            });
        }).catch((error) => {
            console.log('Error gettings users: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al enviar las novedades. Inténtelo nuevamente en unos minutos.',
            });
        });
    };

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                routes={EMPLOYEE_ROUTES(params.companyCode)}
            />
            <CompanyPencaSendNewForm
                onSubmit={handleSubmit}
                feedbackMessage={feedbackMessage}
            />
        </>
    );
};

export default CompanyPencaSendNews;
