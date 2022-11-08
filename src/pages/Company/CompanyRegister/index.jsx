import React from 'react';

import Navbar from '../../../components/Navbar';
import CompanyRegisterForm from '../../../components/Company/CompanyRegisterForm';
import { EMPLOYEE_PAGES } from '../../../utils/navbarItems';

const CompanyRegister = () => {

    return (
        <>
            <Navbar
                pages={EMPLOYEE_PAGES}
            />
            <CompanyRegisterForm />
        </>
    );
};

export default CompanyRegister;
