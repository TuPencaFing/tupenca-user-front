import React from 'react';

import CompanyPlanList from '../../../components/Company/CompanyPlanList';
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import usePlans from '../../../hooks/usePlans';
import { EMPLOYEE_PAGES, USER_ROUTES } from '../../../utils/navbarItems';
import './styles.scss';

const CompanyPlans = () => {
    const {loading, plans} = usePlans();

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={EMPLOYEE_PAGES}
                routes={USER_ROUTES}
            />
            {plans && plans.length > 0 ? (
                <>
                    <h3 className="company-plans-header">Planes empresariales</h3>
                    <CompanyPlanList plans={plans} />
                </>
            ) : (
                <div className="company-plans-list-empty">
                    No se han podido cargar los planes empresariales. Por favor, inténtelo nuevamente en unos minutos.
                </div>
            )}
        </>
    );
};

export default CompanyPlans;
