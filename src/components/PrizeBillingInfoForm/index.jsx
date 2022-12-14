import React from 'react';
import { Field, Form } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import TextFieldAdapter from '../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const PrizeBillingInfoForm = ({ feedbackMessage, onSubmit }) => {

    return (
        <div className="prize-billing-info-container">
            <h3 className="prize-billing-info-header">Datos de facturación</h3>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className="prize-billing-info-form">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    name="bankAccount"
                                    label="Cuenta bancaria"
                                    autoComplete="bankAccount"
                                    component={TextFieldAdapter}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="bankName"
                                    label="Banco"
                                    autoComplete="bankName"
                                    component={TextFieldAdapter}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                        {feedbackMessage ? (
                            <>
                                <br />
                                <Alert severity={feedbackMessage.type}>
                                    {feedbackMessage.message}
                                </Alert>
                            </>
                        ) : null}
                        <Button
                            type="submit"
                            variant="contained"
                            className="prize-billing-info-form-button"
                            disabled={submitting}
                            fullWidth
                        >
                            Reclamar premio
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default PrizeBillingInfoForm;
