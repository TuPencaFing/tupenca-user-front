import React from 'react';
import { Field, Form } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

import AvatarUpload from '../../AvatarUpload';
import TextFieldAdapter from '../../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const CompanyPencaCreateForm = ({
    championships,
    prizes,
    prizesSelected,
    handleChangePrizes,
    feedbackMessage,
    onSubmit,
    setFiles,
}) => {

    return (
        <div className="company-penca-create-form-container">
            <h2 className="company-penca-create-form-header">Crear una nueva penca</h2>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className="company-penca-create-form">
                        <Grid container justifyContent="center" spacing={2}>
                            <AvatarUpload
                                setFiles={setFiles}
                            />
                            <Grid item xs={12}>
                                <Field
                                    name="title"
                                    label="Título"
                                    autoComplete="title"
                                    component={TextFieldAdapter}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="description"
                                    label="Descripción"
                                    autoComplete="description"
                                    component={TextFieldAdapter}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="championship"
                                    label="Campeonato"
                                    autoComplete="description"
                                    component={TextFieldAdapter}
                                    select
                                    fullWidth
                                    required
                                >
                                    {championships && championships.map((championship) => (
                                        <MenuItem
                                            key={championship.id}
                                            value={championship.id}
                                        >
                                            {championship.name}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="prizes"
                                    label="Premios"
                                    autoComplete="prizes"
                                    component={TextFieldAdapter}
                                    select
                                    SelectProps={{
                                        multiple: true,
                                        value: prizesSelected,
                                        onChange: handleChangePrizes,
                                    }}
                                    fullWidth
                                    required
                                >
                                    {prizes && prizes.map((prize) => (
                                        <MenuItem
                                            key={prize.id}
                                            value={prize.id}
                                        >
                                            {prize.position}:{prize.percentage}%
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    type="number"
                                    name="result"
                                    label="Puntos por resultado correcto"
                                    component={TextFieldAdapter}
                                    InputProps={{ inputProps: { min: 0, max: 9999 } }}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    type="number"
                                    name="exactResult"
                                    label="Puntos por resultado exacto"
                                    component={TextFieldAdapter}
                                    InputProps={{ inputProps: { min: 0, max: 9999 } }}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                        {feedbackMessage && (
                            <div className="company-penca-create-form-feedback-message">
                                <br />
                                <Alert severity={feedbackMessage.type}>
                                    {feedbackMessage.message}
                                </Alert>
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="company-penca-create-form-button"
                            variant="contained"
                            disabled={submitting}
                            fullWidth
                        >
                            Crear penca
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default CompanyPencaCreateForm;
