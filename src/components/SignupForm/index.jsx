import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { createUser } from '../../services/users';
import { Copyright } from '../../utils/copyright';

const theme = createTheme();

const SignupForm = () => {
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password'),
        };
        console.log(data);
        createUser(data).then((response) => {
            console.log('Response register: ', response);
            navigate('/login', {
                state: {
                    register: true,
                },
            });
        }).catch((error) => {
            console.log('Error register: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al intentar crear su cuenta, inténtelo nuevamente.',
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
                        Registrarse en Tu Penca
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
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
                            Registrarme
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/login" className="no-style">
                                    ¿Ya tenés una cuenta? Iniciar sesión
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignupForm;
