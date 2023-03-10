import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CompanyAdministrationHeader from '../../../components/Company/CompanyAdministrationHeader';
import CompanyEmployeesTable from '../../../components/Company/CompanyEmployeesTable';
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import useEmployees from '../../../hooks/Company/useEmployees';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';

const CompanyEmployees = () => {
    let params = useParams();
    const {company} = useSelector((state) => state.session);
    const {loading, employees} = useEmployees(company.id);

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                routes={EMPLOYEE_ROUTES(params.companyCode)}
            />
            <CompanyAdministrationHeader />
            <CompanyEmployeesTable
                employees={employees}
            />
        </>
    );
};

export default CompanyEmployees;
