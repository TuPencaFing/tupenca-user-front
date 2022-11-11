import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import './styles.scss'
import useCompanyPencas from '../../../hooks/useCompanyPencas';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_SETTINGS } from '../../../utils/navbarItems';
import { getCompanyRoutes } from '../../../utils/routes';
import Sidebar from '../../../components/Sidebar'
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CompanyEmployeeAdministration = () => {
    let params = useParams();
    const {loading, pencas} = useCompanyPencas();

    const navigate = useNavigate();

    const handleClickPenca = (pencaId) => {
        navigate(`${getCompanyRoutes(params.companyCode).pencas}/${pencaId}`);
    };

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                settings={EMPLOYEE_SETTINGS(params.companyCode)}
            />
            <Grid container alignItems="left">
                <Grid item>
                    <Sidebar type={"employeeAdministration"} />
                </Grid>
                <Grid item>
                    <div className="generalTitle">
                        <KeyboardArrowDownIcon id="iconArrow"/> <div id="tituloGeneral">Funcionarios</div>
                    </div>
                    <div className="generalOptions">
                        <div id="tituloOption">Crear funcionarios</div>
                    </div>
                    <div className="generalOptions">
                        <div id="tituloOption">Lista de funcionarios</div>
                    </div>
                </Grid>
            </Grid>
           
        </>
    );
};

export default CompanyEmployeeAdministration;
