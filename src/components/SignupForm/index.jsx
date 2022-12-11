import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import logo from '../../assets/logo.png';
import TextFieldAdapter from '../TextFieldAdapter';
import { createUser } from '../../services/users';
import { Copyright } from '../../utils/copyright';
import validate from './validate';
import './styles.scss';

const theme = createTheme();

const SignupForm = () => {
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const onSubmit = async values => {
        console.log('Request register: ', values);
        createUser(values).then((response) => {
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
                message: 'Ocurrió un error al crear su cuenta. Inténtelo nuevamente en unos minutos.',
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
                                            name="username"
                                            label="Username"
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
                                            label="Contraseña"
                                            autoComplete="new-password"
                                            component={TextFieldAdapter}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                {feedbackMessage && (
                                    <div className="signup-form-feedback-message">
                                        <br />
                                        <Alert severity={feedbackMessage.type}>
                                            {feedbackMessage.message}
                                        </Alert>
                                    </div>
                                )}
                                <Button
                                    type="submit"
                                    className="signup-form-button"
                                    variant="contained"
                                    disabled={submitting}
                                    fullWidth
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
                            </form>
                        )}
                    />
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignupForm;
