import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CompanyAdministrationHeader from '../../../components/Company/CompanyAdministrationHeader';
import CompanyConfigurationForm from '../../../components/Company/CompanyConfigurationForm';
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import useLookAndFeel from '../../../hooks/Company/useLookAndFeel';
import { uploadImage } from '../../../services/companies';
import { setLookAndFeel } from '../../../services/companyLookAndFeel';
import { setBannerBackground, setBannerText, setBodyBackground, setBodyText } from '../../../utils/colors';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import useCompany from "../../../hooks/Company/useCompany";

const CompanyConfigurations = () => {
    let params = useParams();
    const {loading, configuration} = useLookAndFeel(params.companyCode);
    const {company} = useCompany(params.companyCode);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [generalText, setGeneralText] = React.useState(null);
    const [generalBackground, setGeneralBackground] = React.useState(null);
    const [navbarText, setNavbarText] = React.useState(null);
    const [navbarBackground, setNavbarBackground] = React.useState(null);
    const [files, setFiles] = React.useState(null);

    const handleSetGeneralText = (color) => {
        setBodyText(color.hex);
        setGeneralText(color);
    };

    const handleSetGeneralBackground = (color) => {
        setBodyBackground(color.hex);
        setGeneralBackground(color);
    };

    const handleSetNavbarText = (color) => {
        setBannerText(color.hex);
        setNavbarText(color);
    };

    const handleSetNavbarBackground = (color) => {
        setBannerBackground(color.hex);
        setNavbarBackground(color);
    };

    const handleSubmit = () => {
        console.log('Request to set configuration: ', generalText, generalBackground, navbarText, navbarBackground, files);
        const data = {
            generalText: generalText.hex,
            generalBackground: generalBackground.hex,
            navbarText: navbarText.hex,
            navbar: navbarBackground.hex,
        };
        setLookAndFeel(data).then((response) => {
            console.log('Response set look and feel: ', response);
            if (files !== null) {
                const payload = new FormData();
                payload.append("file", files);
                uploadImage(company.id, payload).then((response) => {
                    console.log('Response upload company image: ', response);
                }).catch((error) => {
                    console.log('Error uploading company image: ', error);
                });
            }
            setFeedbackMessage({
                type: 'success',
                message: 'Configuración guardada con éxito.',
            });
        }).catch((error) => {
            console.log('Error setting look and feel: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'No se pudo guardar su configuración. Inténtelo nuevamente en unos minutos.',
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
            <CompanyAdministrationHeader />
            <CompanyConfigurationForm
                configuration={configuration}
                initialImage={company?.image}
                onSubmit={handleSubmit}
                feedbackMessage={feedbackMessage}
                setGeneralText={handleSetGeneralText}
                setGeneralBackground={handleSetGeneralBackground}
                setNavbarText={handleSetNavbarText}
                setNavbarBackground={handleSetNavbarBackground}
                setFiles={setFiles}
            />
        </>
    );
};

export default CompanyConfigurations;
