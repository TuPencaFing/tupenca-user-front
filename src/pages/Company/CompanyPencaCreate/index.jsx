import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyPencaCreateForm from '../../../components/Company/CompanyPencaCreateForm';
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import usePencaCreate from '../../../hooks/Company/usePencaCreate';
import { createPenca, uploadImage } from '../../../services/companyPencas';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import { getCompanyAdminRoutes } from '../../../utils/routes';

const CompanyPencaCreate = () => {
    let params = useParams();
    const navigate = useNavigate();
    const {loading, championships, prizes} = usePencaCreate();
    const [prizesSelected, setPrizesSelected] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [files, setFiles] = useState(null);

    const handleChangePrizes = (event) => {
        setPrizesSelected(event.target.value);
    };

    const handleSubmit = (values) => {
        console.log('Request to create penca: ', values, files);
        const data = {
            ...values,
            prizes: prizesSelected,
        };
        createPenca(data).then((response) => {
            console.log('Response create penca: ', response);
            // if (files !== null) {
            //     const payload = new FormData();
            //     payload.append("file", files);
            //     uploadImage(pencaId, payload).then((response) => {
            //         console.log('Response upload penca image: ', response);
            //     }).catch((error) => {
            //         console.log('Error uploading penca image: ', error);
            //     });
            // }
            navigate(getCompanyAdminRoutes(params.companyCode).pencas, {
                state: {
                    register: true,
                },
            });
        }).catch((error) => {
            console.log('Error creating penca: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al crear su penca. Inténtelo nuevamente en unos minutos.',
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
            {championships && prizes ? (
                <CompanyPencaCreateForm
                    championships={championships}
                    prizes={prizes}
                    prizesSelected={prizesSelected}
                    handleChangePrizes={handleChangePrizes}
                    feedbackMessage={feedbackMessage}
                    onSubmit={handleSubmit}
                    setFiles={setFiles}
                />
            ) : null}
        </>
    );
};

export default CompanyPencaCreate;
