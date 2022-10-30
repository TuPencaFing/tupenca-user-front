import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import logo from '../../assets/logo.png';
import { Copyright } from '../../utils/copyright';
import ROUTES  from '../../utils/routes';

const theme = createTheme();

const LoginForm = ({ feedbackMessage, handleSubmit, isCompany }) => {
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
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
                    </Box>
                </Box>
                <br />
                {!isCompany && (
                    <div style={{ textAlign: 'center' }}>
                        Sos una empresa y estás interesado en la plataforma?
                        Ingresá <Link to={ROUTES.companyRegister}>aquí</Link> para conocer más
                    </div>
                )}
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
};

export default LoginForm;
