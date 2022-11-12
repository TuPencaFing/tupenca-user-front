import React from 'react';
import { useParams } from "react-router-dom";

import CompanyPencaInviteUserForm from '../../../components/Company/CompanyPencaInviteUserForm';
import Navbar from '../../../components/Navbar';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';

const CompanyPencaInviteUser = () => {
    let params = useParams();

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                routes={EMPLOYEE_ROUTES(params.companyCode)}
            />
            <CompanyPencaInviteUserForm />
        </>
    );
};

export default CompanyPencaInviteUser;
