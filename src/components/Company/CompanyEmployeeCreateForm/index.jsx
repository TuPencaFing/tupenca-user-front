import React from 'react';
import { Field, Form } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import TextFieldAdapter from '../../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const CompanyEmployeeCreateForm = ({ onSubmit, feedbackMessage }) => {

    return (
        <div className="company-employee-create-form-container">
            <h2 className="company-employee-create-form-header">Crear un nuevo funcionario</h2>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className="company-employee-create-form">
                        <Grid container justifyContent="center" spacing={2}>
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
                            <div className="company-employee-create-form-feedback-message">
                                <br />
                                <Alert severity={feedbackMessage.type}>
                                    {feedbackMessage.message}
                                </Alert>
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="company-employee-create-form-button"
                            variant="contained"
                            disabled={submitting}
                            fullWidth
                        >
                            Crear funcionario
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default CompanyEmployeeCreateForm;
