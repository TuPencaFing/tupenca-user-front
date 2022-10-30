import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import logo from '../../assets/logo.png';
import { createCompany } from '../../services/companies';
import { createEmployee } from '../../services/employees';
import { Copyright } from '../../utils/copyright';
import { getCompanyRoutes } from '../../utils/routes';

const theme = createTheme();

const CompanyRegisterForm = () => {
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const createCompanyData = {
            rut: formData.get('rut'),
            companyName: formData.get('companyName'),
        };
        createCompany(createCompanyData).then((companyResponse) => {
            console.log('Company registration response: ', companyResponse);
            const { id } = companyResponse.data;
            const createEmployeeData = {
                companyId: id,
                email: formData.get('email'),
                username: formData.get('username'),
                password: formData.get('password'),
            };
            createEmployee(createEmployeeData).then((employeeResponse) => {
                console.log('Employee registration response: ', employeeResponse);
                navigate(getCompanyRoutes(id).login, {
                    state: {
                        register: true,
                    },
                });
            }).catch((error) => {
                console.log('Error employee register: ', error);
                setFeedbackMessage({
                    type: 'error',
                    message: 'Ocurrió un error al intentar crear su administrador, inténtelo nuevamente.',
                });
            });
        }).catch((error) => {
            console.log('Error in the company registration: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al intentar crear su empresa, inténtelo nuevamente.',
            });
        });
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
                        Registrar tu empresa en Tu Penca
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="companyName"
                                    name="companyName"
                                    required
                                    fullWidth
                                    id="companyName"
                                    label="Razón social"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="rut"
                                    name="rut"
                                    required
                                    fullWidth
                                    id="rut"
                                    label="RUT"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email del administrador de la empresa"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username del administrador de la empresa"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña del administrador de la empresa"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
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
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: 'black' }}
                        >
                            Registrar mi empresa
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
};

export default CompanyRegisterForm;
