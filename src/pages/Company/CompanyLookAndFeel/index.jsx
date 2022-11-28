import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../../components/Navbar';
import Spinner from '../../../components/Spinner';
import Alert from '@mui/material/Alert';
import './styles.scss'
import useColors from '../../../hooks/useColors';
import useCompany from '../../../hooks/useCompany';
import { EMPLOYEE_LOGGED_PAGES, EMPLOYEE_ROUTES } from '../../../utils/navbarItems';
import Sidebar from '../../../components/Sidebar'
import Grid from "@mui/material/Grid";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SwatchesPicker  } from 'react-color';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { editCompanyLookAndFeel } from '../../../services/companies';
import { store } from "../../../app/store"

const CompanyEmployeeAdministration = () => {
    let params = useParams();
    const {loadingColors} = useColors();
    const {loading, company, plan} = useCompany();
    const [changeGeneralTextColor, setChangeGeneralTextColor] = useState(false);
    const [changeGeneralBackgroundColor, setChangeGeneralBackgroundColor] = useState(false);
    const [changeBannerTextColor, setChangeBannerTextColor] = useState(false);
    const [changeBannerBackgroundColor, setChangeBannerBackgroundColor] = useState(false);
    const [changeImage, setChangeImage] = useState(false);
    const [GTC, setGTC] = useState('');
    const [GBC, setGBC] = useState('');
    const [BTC, setBTC] = useState('');
    const [BBC, setBBC] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [mostrarImagen, setMostrarImagen] = useState(true);
    const [fileSelected, setFileSelected] = useState();

    function handleUploadImage() {
        setChangeGeneralTextColor(false);
        setChangeBannerTextColor(false);
        setChangeGeneralBackgroundColor(false);
        setChangeBannerBackgroundColor(false);
        setFileSelected(company.image);
        setChangeImage(true);
    };

    function handleChangeGeneralTextColor() {
        setChangeGeneralTextColor(true);
        setChangeBannerTextColor(false);
        setChangeGeneralBackgroundColor(false);
        setChangeBannerBackgroundColor(false);
        setChangeImage(false);
    };

    function handleChangeGeneralBackgroundColor() {
        setChangeGeneralTextColor(false);
        setChangeBannerTextColor(false);
        setChangeGeneralBackgroundColor(true);
        setChangeBannerBackgroundColor(false);
        setChangeImage(false);
    };

    function handleChangeBannerBackgroundColor() {
        setChangeGeneralTextColor(false);
        setChangeBannerTextColor(false);
        setChangeGeneralBackgroundColor(false);
        setChangeBannerBackgroundColor(true);
        setChangeImage(false);
    };

    function handleChangeBannerTextColor() {
        setChangeGeneralTextColor(false);
        setChangeBannerTextColor(true);
        setChangeGeneralBackgroundColor(false);
        setChangeBannerBackgroundColor(false);
        setChangeImage(false);
    };

   const handleChangeOfGTColor = (color) => {
        setGTC(color.hex);
        document.documentElement.style.setProperty('--color-generaltext', color.hex);
    };

    const handleChangeOfGBColor = (color) => {
        setGBC(color.hex);
        document.documentElement.style.setProperty('--color-generalbackground', color.hex);
    };

    const handleChangeOfBTColor = (color) => {
        setBTC(color.hex);
        document.documentElement.style.setProperty('--color-textnavbar', color.hex);
    };

    const handleChangeOfBBColor = (color) => {
        setBBC(color.hex);
        document.documentElement.style.setProperty('--color-navbar', color.hex);
    };

    const saveLookAndFeel = async () => {
        const data = {
            generaltext: GTC,
            generalbackground: GBC,
            textnavbar: BTC,
            navbar: BBC
          };
        editCompanyLookAndFeel(params.companyCode,data).then((response) => {
            const file = new FormData();
            file.append("file", fileSelected);
            try {
              fetch(`https://localhost:7028/api/empresas/${params.companyCode}/image`, {
              method: 'PATCH',
              headers: {
                "Authorization": `Bearer ${store.getState().session.token}`
              },
              body: file
             })
            } catch (ex) {
              console.log(ex);
            }
            setFeedbackMessage({
                type: 'success',
                message: 'Se cambió el Look&Feel de la empresa.',
            });
        }).catch((error) => {
            console.log('Error in the company cutomization process: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al intentar guardar el Look&Feel de su empresa, inténtelo nuevamente.',
            });
        });
    };

    const saveFileSelected= (e) => {
        setFileSelected(e.target.files[0]);
        setMostrarImagen(false);
      };

    if (loadingColors || loading) return <Spinner />;

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
                                <div id="tituloOption" onClick={handleUploadImage}>Imágen del logo </div>
                            </div>
                            {feedbackMessage && (
                                    <>
                                        <br />
                                        <Alert severity={feedbackMessage.type}>
                                            {feedbackMessage.message}
                                        </Alert>
                                    </>
                                )}
                            <div>
                                <Button
                                        className="look-feel-button"
                                        variant="contained"
                                        onClick={saveLookAndFeel}
                                        fullWidth
                                        style={{ marginTop: 24,
                                            marginBottom: 16,
                                            marginLeft: 80,
                                            backgroundColor: 'black'}}
                                    >
                                        Guardar selección
                                </Button>
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
                            {changeImage && <div>
                                 <div id="tituloOption"><strong>Subir una imágen para la empresa</strong></div>
                                 <Box p={1}></Box>
                                 <Grid item xs={12}>
                                            <input type="file" onChange={saveFileSelected} />
                                            {fileSelected && mostrarImagen && <div>
                                                <img style={{width: 400, height: 400}} src={`${fileSelected}`}/>
                                            </div>}
                                </Grid>
                            </div>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
           
        </>
    );
};

export default CompanyEmployeeAdministration;
