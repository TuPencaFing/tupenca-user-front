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
import { SwatchesPicker  } from 'react-color';
import Box from '@mui/material/Box';

const CompanyEmployeeAdministration = () => {
    let params = useParams();
    const [formCreateEmployee, setFormCreateEmployee] = useState(false);
    const [changeGeneralTextColor, setChangeGeneralTextColor] = useState(false);
    const [changeGeneralBackgroundColor, setChangeGeneralBackgroundColor] = useState(false);
    const [changeBannerTextColor, setChangeBannerTextColor] = useState(false);
    const [changeBannerBackgroundColor, setChangeBannerBackgroundColor] = useState(false);
    const [GTC, setGTC] = useState('');
    const [GBC, setGBC] = useState('');
    const [BTC, setBTC] = useState('');
    const [BBC, setBBC] = useState('');
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

    function handleChangeGeneralTextColor() {
        setChangeGeneralTextColor(true);
        setChangeBannerTextColor(false);
        setChangeGeneralBackgroundColor(false);
        setChangeBannerBackgroundColor(false);
    };

    function handleChangeGeneralBackgroundColor() {
        setChangeGeneralTextColor(false);
        setChangeBannerTextColor(false);
        setChangeGeneralBackgroundColor(true);
        setChangeBannerBackgroundColor(false);
    };

    function handleChangeBannerBackgroundColor() {
        setChangeGeneralTextColor(false);
        setChangeBannerTextColor(false);
        setChangeGeneralBackgroundColor(false);
        setChangeBannerBackgroundColor(true);
    };

    function handleChangeBannerTextColor() {
        setChangeGeneralTextColor(false);
        setChangeBannerTextColor(true);
        setChangeGeneralBackgroundColor(false);
        setChangeBannerBackgroundColor(false);
    };

   const handleChangeOfGTColor = (color) => {
        setGTC({ color: color.hex });
        document.documentElement.style.setProperty('--color-generaltext', color.hex)
        console.log(GTC);
    };

    const handleChangeOfGBColor = (color) => {
        setGBC({ color: color.hex });
        document.documentElement.style.setProperty('--color-generalbackground', color.hex)
        console.log(GBC);
    };

    const handleChangeOfBTColor = (color) => {
        setBTC({ color: color.hex });
        document.documentElement.style.setProperty('--color-textnavbar', color.hex)
    };

    const handleChangeOfBBColor = (color) => {
        setBBC({ color: color.hex });
        document.documentElement.style.setProperty('--color-navbar', color.hex)
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
                    <Sidebar type={"administration"} companyCode={params.companyCode}/>  
                </Grid>
                <Grid item style={{marginLeft: 10}}>
                    <Grid container alignItems="left" >
                        <Grid item>
                            <div className="generalTitle">
                                <KeyboardArrowDownIcon id="iconArrow"/> <div id="tituloGeneral">General</div>
                            </div>
                            <div className="generalOptions">
                                <div id="tituloOption" onClick={handleChangeGeneralTextColor}>Color de texto </div>
                            </div>
                            
                            <div className="generalOptions">
                                <div id="tituloOption" onClick={handleChangeGeneralBackgroundColor}>Color de fondo</div>
                            </div>
                            
                            <div className="generalTitle">
                                <KeyboardArrowDownIcon id="iconArrow"/> <div id="tituloGeneral">Banner</div>
                            </div>
                            <div className="generalOptions">
                                <div id="tituloOption" onClick={handleChangeBannerTextColor}>Color de texto </div>
                            </div>
                           
                            <div className="generalOptions">
                                <div id="tituloOption" onClick={handleChangeBannerBackgroundColor}>Color de fondo</div>
                            </div>
                            
                            <div className="generalTitle">
                                <KeyboardArrowDownIcon id="iconArrow"/> <div id="tituloGeneral">Logo</div>
                            </div>
                            <div className="generalOptions">
                                <div id="tituloOption" onClick={handleCreateClickEvent}>Imágen del logo </div>
                            </div>
                        </Grid>
                        <Grid item style={{marginLeft: 300, marginTop: 100}}>
                            {changeGeneralTextColor &&
                             <div>
                                 <div id="tituloOption"><strong>Color general del texto</strong></div>
                                 <Box p={1}></Box>
                                <SwatchesPicker value={GTC} onChange={ handleChangeOfGTColor }/>
                            </div>}
                            {changeGeneralBackgroundColor && <div>
                                 <div id="tituloOption"><strong>Color general del fondo</strong></div>
                                 <Box p={1}></Box>
                                <SwatchesPicker value={GBC} onChange={ handleChangeOfGBColor } />
                            </div>}
                            {changeBannerTextColor && <div>
                                 <div id="tituloOption"><strong>Color de texto del banner</strong></div>
                                 <Box p={1}></Box>
                                <SwatchesPicker value={BTC} onChange={ handleChangeOfBTColor } />
                            </div>}
                            {changeBannerBackgroundColor && <div>
                                 <div id="tituloOption"><strong>Color de fondo del banner</strong></div>
                                 <Box p={1}></Box>
                                <SwatchesPicker  value={BBC} onChange={ handleChangeOfBBColor } />
                            </div>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
           
        </>
    );
};

export default CompanyEmployeeAdministration;
