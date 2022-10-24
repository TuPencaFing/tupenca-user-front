import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { setToken } from '../../features/session/sessionSlice';
import { logIn } from '../../services/users';
import { Copyright } from '../../utils/copyright';

const theme = createTheme();

const LoginForm = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };
        console.log('Request to login: ', data);
        logIn(data).then((response) => {
            console.log('Response login: ', response);
            const { token } = response.data;
            dispatch(setToken(token));
            navigate('/');
        }).catch((error) => {
            console.log('Error login: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al intentar ingresar con su cuenta, inténtelo nuevamente.',
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
                        Iniciar sesión en Tu Penca
                    </Typography>
                    {location?.state?.register && (
                        <>
                            <br />
                            <Alert severity="success">
                                Su cuenta fue creada correctamente. Ya puede iniciar sesión.
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
                            <Grid item>
                                <Link to="/registro" className="no-style">
                                    Crear mi cuenta
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
};

export default LoginForm;
