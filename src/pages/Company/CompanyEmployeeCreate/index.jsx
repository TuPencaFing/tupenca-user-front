import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyAdministrationHeader from '../../../components/Company/CompanyAdministrationHeader';
import CompanyEmployeeCreateForm from '../../../components/Company/CompanyEmployeeCreateForm';
import Navbar from '../../../components/Navbar';
import { createEmployee } from '../../../services/employees';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import { getCompanyAdminRoutes } from '../../../utils/routes';

const CompanyEmployeeCreate = () => {
    let params = useParams();
    const navigate = useNavigate();
    const {company} = useSelector((state) => state.session);
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = (values) => {
        console.log('Request to create employee: ', values);
        const data = {
            ...values,
            companyId: parseInt(company.id),
        };
        createEmployee(data).then((response) => {
            console.log('Response create employee: ', response);
            navigate(getCompanyAdminRoutes(params.companyCode).adminEmployees, {
                state: {
                    register: true,
                },
            });
        }).catch((error) => {
            console.log('Error create employee: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'No se logró crear el funcionario. Inténtelo nuevamente en unos minutos.',
            });
        });
    };

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                routes={EMPLOYEE_ROUTES(params.companyCode)}
            />
            <CompanyAdministrationHeader />
            <CompanyEmployeeCreateForm
                onSubmit={handleSubmit}
                feedbackMessage={feedbackMessage}
            />
        </>
    );
};

export default CompanyEmployeeCreate;
