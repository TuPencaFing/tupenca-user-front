import React from 'react';
import { useParams } from "react-router-dom";

import CompanyPencaInviteUserForm from '../../components/CompanyPencaInviteUserForm';
import Navbar from '../../components/Navbar';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_SETTINGS } from '../../utils/navbarItems';

const CompanyPencaInviteUser = () => {
    let params = useParams();

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                settings={EMPLOYEE_SETTINGS(params.companyCode)}
            />
            <CompanyPencaInviteUserForm />
        </>
    );
};

export default CompanyPencaInviteUser;
