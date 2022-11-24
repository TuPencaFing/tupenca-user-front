import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import useCompanyPencas from '../../../hooks/useCompanyPencas';
import useCompany from '../../../hooks/useCompany';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Grid from '@mui/material/Grid';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import { getCompanyRoutes } from '../../../utils/routes';
import CompanyPencaForm from "../../../components/Company/CompanyPencaForm";

const CompanyPencas = () => {
    let params = useParams();
    const {loadingCompany, company, plan} = useCompany();
    const {loading, pencas} = useCompanyPencas();
    const [mostrarCrearPenca, setMostrarCrearPenca] = useState(false);

    const navigate = useNavigate();

    const handleClickPenca = (pencaId) => {
        navigate(`${getCompanyRoutes(params.companyCode).pencas}/${pencaId}`);
    };

    const handleClickCrearPenca = () => {
        if(mostrarCrearPenca){
            setMostrarCrearPenca(false);
        }
        else{
            setMostrarCrearPenca(true);
        }
    };

    if (loading || loadingCompany) return <Spinner />;

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
                        <div id="tituloOption">Pencas restantes: <strong>{plan.cantPencas - pencas.length}</strong></div>
                    </div>
                    <div className="generalOptions">
                        <div id="tituloOption" onClick={(plan.cantPencas - pencas.length) == 0 ? "" : handleClickCrearPenca} >Crear nueva penca</div>
                    </div>
                </Grid>
                <Grid item style={{marginLeft: 300}}>
                    {mostrarCrearPenca && <CompanyPencaForm planId={company.planId}/>}
                </Grid>
            </Grid>
        </>
    );
};

export default CompanyPencas;
