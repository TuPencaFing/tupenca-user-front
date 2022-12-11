import React from 'react';
import { Field, Form } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import TextFieldAdapter from '../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const ResetPasswordForm = ({ feedbackMessage, onSubmit }) => {

    return (
        <div className="reset-password-container">
            <h3>Establecer mi nueva contraseña</h3>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className="reset-password-form">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    type="password"
                                    name="password"
                                    label="Contraseña"
                                    autoComplete="password"
                                    component={TextFieldAdapter}
                                    fullWidth
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    label="Confirmar contraseña"
                                    autoComplete="confirmPassword"
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
                            className="reset-password-button"
                            variant="contained"
                            disabled={submitting}
                            sx={{ mt: 3, mb: 2 }}
                            fullWidth
                        >
                            Establecer nueva contraseña
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default ResetPasswordForm;
