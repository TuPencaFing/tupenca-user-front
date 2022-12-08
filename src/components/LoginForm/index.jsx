import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import logo from '../../assets/logo.png';
import { Copyright } from '../../utils/copyright';
import ROUTES from '../../utils/routes';
import TextFieldAdapter from '../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const theme = createTheme();

const LoginForm = ({ feedbackMessage, onSubmit, isCompany }) => {
    let location = useLocation();
    const title = isCompany ? 'Iniciar sesión con tu empresa' : 'Iniciar sesión en Tu Penca';
    const successfulRegistration = isCompany
        ? 'Su empresa fue creada correctamente. Ya puede iniciar sesión con el administrador.'
        : 'Su cuenta fue creada correctamente. Ya puede iniciar sesión.';

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
                        {title}
                    </Typography>
                    {location?.state?.register && (
                        <>
                            <br />
                            <Alert severity="success">
                                {successfulRegistration}
                            </Alert>
                        </>
                    )}
                    <Form
                        onSubmit={onSubmit}
                        validate={validate}
                        render={({ handleSubmit, submitting }) => (
                            <form onSubmit={handleSubmit} className="signup-form">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            name="email"
                                            label="Email"
                                            autoComplete="email"
                                            component={TextFieldAdapter}
                                            fullWidth
                                            autoFocus
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            type="password"
                                            name="password"
                                            label="Contraseña"
                                            autoComplete="current-password"
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
                                    className="login-button"
                                    variant="contained"
                                    disabled={submitting}
                                    sx={{ mt: 3, mb: 2 }}
                                    fullWidth
                                >
                                    Iniciar sesión
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link to="#" className="no-style">
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </Grid>
                                    {!isCompany && (
                                        <Grid item>
                                            <Link to={ROUTES.register} className="no-style">
                                                Crear mi cuenta
                                            </Link>
                                        </Grid>
                                    )}
                                </Grid>
                            </form>
                        )}
                    />
                </Box>
                <br />
                {!isCompany && (
                    <div style={{ textAlign: 'center' }}>
                        Sos una empresa y estás interesado en la plataforma?
                        Ingresá <Link to={ROUTES.companyPlans}>aquí</Link> para conocer más
                    </div>
                )}
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
};

export default LoginForm;
