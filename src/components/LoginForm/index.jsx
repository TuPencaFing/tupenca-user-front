import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import GoogleLogin from '@leecheuk/react-google-login';
import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import CustomDivider from '../CustomDivider';
import ROUTES from '../../utils/routes';
import TextFieldAdapter from '../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const theme = createTheme();

const LoginForm = ({ isCompany, feedbackMessage, onSubmit, onSuccessGoogle, onFailureGoogle }) => {
    let location = useLocation();
    const title = isCompany ? 'Iniciar sesión con tu empresa' : 'Iniciar sesión en Tu Penca';
    const successfulRegistration = isCompany
        ? 'Su empresa fue creada correctamente. Ya puede iniciar sesión con el administrador.'
        : 'Su cuenta fue creada correctamente. Ya puede iniciar sesión.';
    const successPasswordReset = 'Se envió un mail para que pueda restablecer su contraseña.';
    const successSetPassword = 'Se estableció la contraseña correctamente. Ya puede iniciar sesión.';

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    className="login-form-container"
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        {title}
                    </Typography>
                    {!isCompany ? (
                        <>
                            <GoogleLogin
                                className="google-login-button"
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText="Iniciar sesión con Google"
                                onSuccess={onSuccessGoogle}
                                onFailure={onFailureGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                            <CustomDivider />
                        </>
                    ) : null}
                    {location?.state?.register ? (
                        <>
                            <br />
                            <Alert severity="success">
                                {successfulRegistration}
                            </Alert>
                        </>
                    ) : null}
                    {location?.state?.forgotPassword ? (
                        <>
                            <br />
                            <Alert severity="success">
                                {successPasswordReset}
                            </Alert>
                        </>
                    ) : null}
                    {location?.state?.resetPassword ? (
                        <>
                            <br />
                            <Alert severity="success">
                                {successSetPassword}
                            </Alert>
                        </>
                    ) : null}
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
                                        <Link to={ROUTES.forgotPassword} className="no-style">
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
            </Container>
        </ThemeProvider>
    );
};

export default LoginForm;
