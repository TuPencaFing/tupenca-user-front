import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import logo from '../../../assets/logo.png';
import { createCompany } from '../../../services/companies';
import { createEmployee } from '../../../services/employees';
import { Copyright } from '../../../utils/copyright';
import { getCompanyAdminRoutes } from '../../../utils/routes';
import TextFieldAdapter from '../../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const theme = createTheme();

const CompanyRegisterForm = () => {
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const onSubmit = async (values) => {
        console.log('Request company register: ', values);
        const createCompanyData = {
            rut: values.rut,
            companyName: values.companyName,
        };
        createCompany(createCompanyData).then((companyResponse) => {
            console.log('Company registration response: ', companyResponse);
            const { id } = companyResponse.data;
            const createEmployeeData = {
                companyId: id,
                email: values.email,
                username: values.username,
                password: values.password,
            };
            createEmployee(createEmployeeData).then((employeeResponse) => {
                console.log('Employee registration response: ', employeeResponse);
                navigate(getCompanyAdminRoutes(id).login, {
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
                    <Form
                        onSubmit={onSubmit}
                        validate={validate}
                        render={({ handleSubmit, submitting }) => (
                            <form onSubmit={handleSubmit} className="company-register-form">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            name="companyName"
                                            label="Razón social"
                                            autoComplete="companyName"
                                            component={TextFieldAdapter}
                                            fullWidth
                                            autoFocus
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="rut"
                                            label="RUT"
                                            autoComplete="rut"
                                            component={TextFieldAdapter}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="email"
                                            label="Email del administrador de la empresa"
                                            autoComplete="email"
                                            component={TextFieldAdapter}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="username"
                                            label="Username del administrador de la empresa"
                                            autoComplete="username"
                                            component={TextFieldAdapter}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            type="password"
                                            name="password"
                                            label="Contraseña del administrador de la empresa"
                                            autoComplete="new-password"
                                            component={TextFieldAdapter}
                                            fullWidth
                                            required
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
                                    variant="contained"
                                    className="company-register-form-button"
                                    disabled={submitting}
                                    fullWidth
                                >
                                    Registrar mi empresa
                                </Button>
                            </form>
                        )}
                    />
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
};

export default CompanyRegisterForm;
