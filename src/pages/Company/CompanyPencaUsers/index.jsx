import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import CompanyPencaHeader from '../../../components/Company/CompanyPencaHeader';
import CompanyPencaUsersTable from '../../../components/Company/CompanyPencaUsersTable';
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import usePencaUsers from '../../../hooks/Company/usePencaUsers';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import './styles.scss';

const CompanyPencaUsers = () => {
    let params = useParams();
    const {loading, users, enableUser, rejectUser} = usePencaUsers(params.pencaId);
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleEnableUser = (userId) => {
        enableUser(userId).then(() => {
            setFeedbackMessage({
                type: 'success',
                message: 'Usuario habilitado con éxito.',
            });
        }).catch((error) => {
            console.log('Error enable user: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'No se ha podido habilitar al usuario. Inténtelo nuevamente en unos minutos.',
            });
        });
    };

    const handleRejectUser = (userId) => {
        rejectUser(userId).then(() => {
            setFeedbackMessage({
                type: 'success',
                message: 'Usuario rechazado con éxito.',
            });
        }).catch((error) => {
            console.log('Error reject user: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'No se ha podido rechazar al usuario. Inténtelo nuevamente en unos minutos.',
            });
        });
    };

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                routes={EMPLOYEE_ROUTES(params.companyCode)}
            />
            <CompanyPencaHeader />
            {feedbackMessage && (
                <div className="company-penca-users-feedback-message">
                    <br />
                    <Alert severity={feedbackMessage.type}>
                        {feedbackMessage.message}
                    </Alert>
                </div>
            )}
            <CompanyPencaUsersTable
                users={users}
                handleEnableUser={handleEnableUser}
                handleRejectUser={handleRejectUser}
            />
        </>
    );
};

export default CompanyPencaUsers;
