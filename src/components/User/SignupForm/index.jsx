import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import AvatarUpload from '../../AvatarUpload';
import TextFieldAdapter from '../../TextFieldAdapter';
import { createUser } from '../../../services/users';
import validate from './validate';
import './styles.scss';

const SignupForm = () => {
    const navigate = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [files, setFiles] = useState(null);

    const onSubmit = async values => {
        console.log('Request register: ', values);
        console.log('Files: ', files);
        const payload = new FormData();
        payload.append("email", values.email);
        payload.append("username", values.username);
        payload.append("password", values.password);
        if (files !== null) {
            payload.append("image.file", files);
        }
        createUser(payload).then((response) => {
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
        <div className="user-register-container">
            <h2 className="user-register-header">Registrarse en Tu Penca</h2>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className="signup-form">
                        <Grid container justifyContent="center" spacing={2}>
                            <AvatarUpload
                                setFiles={setFiles}
                            />
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
        </div>
    );
}

export default SignupForm;
