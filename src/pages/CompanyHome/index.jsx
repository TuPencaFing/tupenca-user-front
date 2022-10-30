import React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_SETTINGS } from '../../utils/navbarItems';

const CompanyHome = () => {
    let params = useParams();

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                settings={EMPLOYEE_SETTINGS(params.companyCode)}
            />
        </>
    );
};

export default CompanyHome;
