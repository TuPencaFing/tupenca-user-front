import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import './styles.scss'
import useCompanyPencas from '../../../hooks/useCompanyPencas';
import useCompanyEmployees from '../../../hooks/useCompanyEmployees';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import Sidebar from '../../../components/Sidebar'
import Grid from "@mui/material/Grid";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmployeeRegisterForm from '../../../components/Company/EmployeeRegisterForm';
import CompanyEmplyeeList from '../../../components/Company/CompanyEmployeeList';

const CompanyEmployeeAdministration = () => {
    let params = useParams();
    const [formCreateEmployee, setFormCreateEmployee] = useState(false);
    const [listEmployees, setListEmployees] = useState(false);
    const {loading, pencas} = useCompanyPencas();
    const {loadingEmployees, employees} = useCompanyEmployees();

    const navigate = useNavigate();

    function handleCreateClickEvent() {
        setFormCreateEmployee(true);
        setListEmployees(false);
    };

    function handleListClickEvent() {
        setFormCreateEmployee(false);
        setListEmployees(true);
    };

    if (loading || loadingEmployees) return <Spinner />;

    return (
        <>
            <Navbar
                pages={EMPLOYEE_LOGGED_PAGES(params.companyCode)}
                settings={EMPLOYEE_ROUTES(params.companyCode)}
            />
            <Grid container alignItems="left" >
                <Grid item>
                    <Sidebar type={"employeeAdministration"} companyCode={params.companyCode}/>
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
                            {listEmployees && <CompanyEmplyeeList employees={employees} />}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
           
        </>
    );
};

export default CompanyEmployeeAdministration;
