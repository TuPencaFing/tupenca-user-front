import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyPencaCreateForm from '../../../components/Company/CompanyPencaCreateForm';
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import usePencaCreate from '../../../hooks/Company/usePencaCreate';
import { createPenca, uploadImage } from '../../../services/companyPencas';
import { createScore } from '../../../services/scores';
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
        const scoreData = {
            result: values.result,
            exactResult: values.exactResult,
        };
        createScore(scoreData).then((scoreResponse) => {
            console.log('Response create score: ', scoreResponse);
            const { id: scoreId } = scoreResponse.data;
            const pencaData = {
                ...values,
                prizes: prizesSelected,
                scoreId,
            };
            createPenca(params.companyCode, pencaData).then((pencaResponse) => {
                console.log('Response create penca: ', pencaResponse);
                const { id: pencaId } = pencaResponse.data;
                if (files !== null) {
                    const payload = new FormData();
                    payload.append("file", files);
                    uploadImage(pencaId, payload).then((response) => {
                        console.log('Response upload penca image: ', response);
                    }).catch((error) => {
                        console.log('Error uploading penca image: ', error);
                    });
                }
                navigate(getCompanyAdminRoutes(params.companyCode).pencas, {
                    state: {
                        register: true,
                    },
                });
            }).catch((error) => {
                console.log('Error creating penca: ', error);
                setFeedbackMessage({
                    type: 'error',
                    message: 'Ocurri?? un error al crear su penca. Int??ntelo nuevamente en unos minutos.',
                });
            });
        }).catch((error) => {
            console.log('Error creating score: ', error);
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
