import React from 'react';
import { Field, Form } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import TextFieldAdapter from '../../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const CompanyPencaSendNewsForm = ({ onSubmit, feedbackMessage }) => {

    return (
        <div className="company-penca-send-news-form-container">
            <h2 className="company-penca-send-news-form-header">Enviar novedades</h2>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className="company-penca-send-news-form">
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    name="subject"
                                    label="Asunto"
                                    autoComplete="subject"
                                    component={TextFieldAdapter}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="body"
                                    label="Cuerpo del mensaje"
                                    component={TextFieldAdapter}
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                        {feedbackMessage && (
                            <div className="company-penca-send-news-form-feedback-message">
                                <br />
                                <Alert severity={feedbackMessage.type}>
                                    {feedbackMessage.message}
                                </Alert>
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="company-penca-send-news-form-button"
                            variant="contained"
                            disabled={submitting}
                            fullWidth
                        >
                            Enviar novedades
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default CompanyPencaSendNewsForm;
