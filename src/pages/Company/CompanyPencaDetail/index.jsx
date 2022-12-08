import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import Navbar from '../../../components/Navbar';
import useColors from '../../../hooks/useColors';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import { getCompanyAdminRoutes } from '../../../utils/routes';
import CompanyPencaInviteUserForm from '../../../components/Company/CompanyPencaInviteUserForm';
import CompanyUsersList from '../../../components/Company/CompanyUsersList';
import Spinner from '../../../components/Spinner';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Grid from "@mui/material/Grid";
import useCompany from '../../../hooks/useCompany';
import useCompanyUsers from '../../../hooks/useCompanyUsers';
import Sidebar from '../../../components/Sidebar'
import './styles.scss';

const CompanyPencaDetail = () => {
    const navigate = useNavigate();
    const [sendInvitation, setSendInvitation] = useState(false);
    const [usersList, setUsersList] = useState(false);
    const {loadingColors} = useColors();
    const {loading, company, plan} = useCompany();
    const {loadingUsers, users} = useCompanyUsers();
    let params = useParams();

    if (loading || loadingColors || loadingUsers) return <Spinner />;

    const handleSendInvitation = () => {
        setSendInvitation(true);
        setUsersList(false);
    };

    const handleListUsers = () => {
        setSendInvitation(false);
        setUsersList(true);
    };

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                routes={EMPLOYEE_ROUTES(params.companyCode)}
            />
            <Grid container alignItems="left" >
                <Grid item>
                    <Sidebar type={"pencas"} companyCode={params.companyCode}/>  
                </Grid>
                <Grid item>
                    <div className="generalTitle">
                        <KeyboardArrowDownIcon id="iconArrow"/> <div id="tituloGeneral">General</div>
                    </div>
                    <div className="generalOptionsSinHover">
                        <div id="tituloOption">Invitaciones restantes: <strong>{plan.cantUser - users.length}</strong></div>
                    </div>                    
                    <div className="generalTitle">
                        <KeyboardArrowDownIcon id="iconArrow"/> <div id="tituloGeneral">Usuarios</div>
                    </div>
                    <div className="generalOptions">
                        <div id="tituloOption" onClick={handleSendInvitation}>Invitar Usuario </div>
                    </div>
                    <div className="generalOptions">
                        <div id="tituloOption" onClick={handleListUsers}>Listar Usuarios</div>
                    </div>
                </Grid>
                {sendInvitation && <Grid item style={{marginLeft: 500}}>
                    <div>
                        <CompanyPencaInviteUserForm />
                    </div>
                </Grid>}
                {usersList && <Grid item style={{marginLeft: 500}}>
                    <div>
                        <CompanyUsersList users={users} />
                    </div>
                </Grid>}
            </Grid>
        </>
    );
};

export default CompanyPencaDetail;
