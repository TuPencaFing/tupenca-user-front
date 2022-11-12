import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import './styles.scss'
import useCompanyPencas from '../../../hooks/useCompanyPencas';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_SETTINGS } from '../../../utils/navbarItems';
import { getCompanyRoutes } from '../../../utils/routes';
import Sidebar from '../../../components/Sidebar'
import Grid from "@mui/material/Grid";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmployeeRegisterForm from '../../../components/EmployeeRegisterForm';

const CompanyEmployeeAdministration = () => {
    let params = useParams();
    const [formCreateEmployee, setFormCreateEmployee] = useState(false);
    const [listEmployees, setListEmployees] = useState(false);
    const {loading, pencas} = useCompanyPencas();

    const navigate = useNavigate();

    const handleClickPenca = (pencaId) => {
        navigate(`${getCompanyRoutes(params.companyCode).pencas}/${pencaId}`);
    };

    function handleCreateClickEvent() {
        setFormCreateEmployee(true);
        setListEmployees(false);
    };

    function handleListClickEvent() {
        setFormCreateEmployee(false);
        setListEmployees(true);
    };

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                settings={EMPLOYEE_SETTINGS(params.companyCode)}
            />
            <Grid container alignItems="left" >
                <Grid item>
                    <Sidebar type={"employeeAdministration"} />
                </Grid>
                <Grid item style={{marginLeft: 10}}>
                    <Grid container alignItems="left" >
                        <Grid item>
                            <div className="generalTitle">
                                <KeyboardArrowDownIcon id="iconArrow"/> <div id="tituloGeneral">Funcionarios</div>
                            </div>
                            <div className="generalOptions">
                                <div id="tituloOption" onClick={handleCreateClickEvent}>Crear funcionarios</div>
                            </div>
                            <div className="generalOptions">
                                <div id="tituloOption" onClick={handleListClickEvent}>Lista de funcionarios</div>
                            </div>
                        </Grid>
                        <Grid item style={{marginLeft: 300}}>
                            {formCreateEmployee && <EmployeeRegisterForm />}
                            {listEmployees && <div>Chau</div>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
           
        </>
    );
};

export default CompanyEmployeeAdministration;
