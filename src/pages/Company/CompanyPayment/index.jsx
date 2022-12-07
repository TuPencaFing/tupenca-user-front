import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '../../../components/Navbar';
import PaymentForm from '../../../components/PaymentForm';
import { createCompany } from '../../../services/companies';
import { createEmployee } from '../../../services/employees';
import { getPlanById } from '../../../services/plans';
import { EMPLOYEE_PAGES, USER_ROUTES } from '../../../utils/navbarItems';
import ROUTES from '../../../utils/routes';

const CompanyPayment = () => {
    let params = useParams();
    const navigate = useNavigate();
    const { companyName, rut, companyCode, admin } = useSelector((state) => state.company);
    const [amount, setAmount] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = (cardFormData) => {
        const createCompanyData = {
            companyName,
            rut,
            companyCode,
            planId: params.planId,
            cardFormData,
        };
        createCompany(createCompanyData).then((companyResponse) => {
            console.log('Company registration response: ', companyResponse);
            const { id } = companyResponse.data;
            const createEmployeeData = {
                companyId: id,
                email: admin.email,
                username: admin.username,
                password: admin.password,
            };
            createEmployee(createEmployeeData).then((employeeResponse) => {
                console.log('Employee registration response: ', employeeResponse);
                navigate(`${ROUTES.companyPlans}/registrationFinished`);
            }).catch((error) => {
                console.log('Error employee register: ', error);
                setFeedbackMessage({
                    type: 'error',
                    message: 'Ocurrió un error en la recepción de pago, inténtelo nuevamente.',
                });
            });
        }).catch((error) => {
            console.log('Error in the company registration: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error en la recepción de pago, inténtelo nuevamente.',
            });
        });
    };

    useEffect(() => {
        getPlanById(params.planId).then((response) => {
            console.log('Response of get plan by ID: ', response);
            const { cost } = response.data;
            setAmount(cost);
        }).catch((error) => {
            console.error('Error getting plan by ID: ', error);
        });
    }, [params.planId]);

    return (
        <>
            <Navbar
                pages={EMPLOYEE_PAGES}
                routes={USER_ROUTES}
            />
            {amount ? (
                <PaymentForm
                    handleSubmit={handleSubmit}
                    amount={amount}
                    feedbackMessage={feedbackMessage}
                />
            ) : null}
        </>
    );
};

export default CompanyPayment;
