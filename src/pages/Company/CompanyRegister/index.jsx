import React from 'react';

import Navbar from '../../../components/Navbar';
import CompanyRegisterForm from '../../../components/Company/CompanyRegisterForm';
import { EMPLOYEE_PAGES, USER_ROUTES } from '../../../utils/navbarItems';

const CompanyRegister = () => {

    return (
        <>
            <Navbar
                pages={EMPLOYEE_PAGES}
                routes={USER_ROUTES}
            />
            <CompanyRegisterForm />
        </>
    );
};

export default CompanyRegister;
