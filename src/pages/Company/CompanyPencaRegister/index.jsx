import React from 'react';

import Navbar from '../../../components/Navbar';
import CompanyPencaForm from '../../../components/Company/CompanyPencaForm';
import { EMPLOYEE_PAGES } from '../../../utils/navbarItems';

const CompanyPencaRegister = () => {

    return (
        <>
            <Navbar
                pages={EMPLOYEE_PAGES}
            />
            <CompanyPencaForm />
        </>
    );
};

export default CompanyPencaRegister;
