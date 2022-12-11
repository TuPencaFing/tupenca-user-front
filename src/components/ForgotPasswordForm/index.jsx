import React from 'react';
import { Field, Form } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import TextFieldAdapter from '../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const ForgotPasswordForm = ({ feedbackMessage, onSubmit }) => {

    return (
        <div className="forgot-password-container">
            <h3>Olvidé mi contraseña</h3>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className="forgot-password-form">
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
                            className="forgot-password-button"
                            variant="contained"
                            disabled={submitting}
                            sx={{ mt: 3, mb: 2 }}
                            fullWidth
                        >
                            Solicitar contraseña
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default ForgotPasswordForm;
