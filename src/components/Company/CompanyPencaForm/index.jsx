import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useChampionships from "../../../hooks/useChampionships";
import usePrizes from "../../../hooks/usePrizes";
import logo from '../../../assets/logo.png';
import { Select, MenuItem, FormHelperText, InputLabel, Chip } from '@mui/material';
import { createPencaCompany } from '../../../services/companies';
import TextFieldAdapter from '../../TextFieldAdapter';
import './styles.scss';
import { store } from "../../../app/store"

const theme = createTheme();

const CompanyPencaForm = ({planId}) => {
    const navigate = useNavigate();
    const {companyCode} = useParams();
    const [codPlan, setCodPlan] = useState(planId);
    const [fileSelected, setFileSelected] = useState();
    const [campeonato, setCampeonato] = useState('');
    const {loading, championships} = useChampionships();
    const [premios, setPremios] = useState([]);
    const {loadingPrizes,prizes} = usePrizes();
    const [mostrarImagen, setMostrarImagen] = useState(true);
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const onSubmit = async (values) => {
        console.log("Entro");
        const data = {
            id: 0,
            title: values.title,
            description: values.description,
            image: "string",
            campeonato: {
              id: campeonato
            },
            puntajeId: 0,
            puntaje: {
              id: 0,
              resultado: 0,
              resultadoExacto: 0
            },
            premios: premios,
            empresa: {
               id: companyCode,
               planId: codPlan
            }
          };
        createPencaCompany(data).then((companyResponse) => {
            const { id } = companyResponse.data;
            const file = new FormData();
            file.append("file", fileSelected);
            try {
              fetch(`https://localhost:7028/api/pencas-empresas/${id}/image`, {
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
                message: 'Penca registrada con éxito.',
            });
            window.location.reload();
        }).catch((error) => {
            console.log('Error in the company penca registration: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al intentar crear la penca de su empresa, inténtelo nuevamente.',
            });
        });
    };

    const saveFileSelected= (e) => {
        setFileSelected(e.target.files[0]);
        setMostrarImagen(false);
      };

    function selectionChangeHandler(id,label) {
    premios.push({ label: label, id: id });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={logo}
                        alt="Tu Penca"
                        width="64px"
                        height="59px"
                    />
                    <Typography component="h1" variant="h5">
                        Crea una nueva penca
                    </Typography>
                    <Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit, submitting }) => (
                            <form onSubmit={handleSubmit} className="company-register-form">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                    <Typography variant="h5">Título *</Typography>
                                        <Field className="hola"
                                            name="title"
                                            autoComplete="title"
                                            component={TextFieldAdapter}
                                            fullWidth
                                            autoFocus
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                    <Typography variant="h5">Descripción *</Typography>
                                        <Field
                                            name="description"
                                            autoComplete="description"
                                            component={TextFieldAdapter}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5">Campeonato *</Typography>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={championships}
                                            sx={{ width: 300 }}
                                            onChange={(event, value) => setCampeonato(value.id)}
                                            renderInput={(params) => <TextField {...params} label="" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5">Premios *</Typography>
                                        <InputLabel></InputLabel>
                                        <Select
                                            multiple
                                            value={premios}
                                            renderValue={(premios) => (
                                                <div>
                                                {premios.map((ev) => (
                                                    <Chip key={ev.id} label={ev.label} />
                                                ))}
                                                </div>
                                            )}
                                        >
                                            {prizes.map(ev =>  <MenuItem onClick={() => selectionChangeHandler(ev.id,ev.label)} value={ev.id} label={ev.label}>{ev.label}</MenuItem>)}
                                        </Select>
                                        <FormHelperText>Seleccione los premios de la penca</FormHelperText>
                                    </Grid>
                                    <Grid item xs={12}>
                                            <input type="file" onChange={saveFileSelected} />
                                            {fileSelected && mostrarImagen && <div>
                                                <img style={{width: 400, height: 400}} src={`${fileSelected}`}/>
                                            </div>}
                                    </Grid>
                                </Grid>
                                {feedbackMessage && (
                                    <>
                                        <br />
                                        <Alert severity={feedbackMessage.type}>
                                            {feedbackMessage.message}
                                        </Alert>
                                    </>
                                )}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="company-register-form-button"
                                    disabled={submitting}
                                    fullWidth
                                >
                                    Crear penca
                                </Button>
                            </form>
                        )}
                    />
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default CompanyPencaForm;
