import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import useCompany from '../../../hooks/useCompany';
import useCompanySubscriptions from '../../../hooks/useCompanySubscriptions';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_SETTINGS } from '../../../utils/navbarItems';
import Sidebar from '../../../components/Sidebar'
import Grid from "@mui/material/Grid";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CompanySubscriptionList from "../../../components/Company/CompanySubscriptionList"

const CompanyAdministration = () => {
    let params = useParams();
    const {loading, company} = useCompany();
    const {loadingSubscripcions, subscriptions} = useCompanySubscriptions();
    const [changePlan, setChangePlan] = useState(false);

    const navigate = useNavigate();

    function handleChangePlan() {
        setChangePlan(true);
    };

    if (loadingSubscripcions || loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                settings={EMPLOYEE_SETTINGS(params.companyCode)}
            />
            <Grid container alignItems="left" >
                <Grid item>
                    <Sidebar type={"administration"} companyCode={params.companyCode} />
                </Grid>
                <Grid item style={{marginLeft: 10}}>
                    <Grid container alignItems="left" >
                        <Grid item>
                            <div className="generalTitle">
                                <KeyboardArrowDownIcon id="iconArrow"/> <div id="tituloGeneral">General</div>
                            </div>
                            <div className="generalOptions">
                                <div id="tituloOption" onClick={handleChangePlan}><strong>{company.planId == 1 ? "Básico" : "Pro"}:</strong> {company.plan.cantUser} usuarios, {company.plan.cantPencas} penca/s </div>
                            </div>
                        </Grid>
                        <Grid item style={{marginLeft: 300}}>
                            {changePlan && <CompanySubscriptionList subscriptions={subscriptions} activeSubscription={company.planId} />}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default CompanyAdministration;
