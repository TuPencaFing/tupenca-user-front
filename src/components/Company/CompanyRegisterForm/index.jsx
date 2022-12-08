import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { setCompany } from '../../../features/company/companySlice';
import ROUTES from '../../../utils/routes';
import TextFieldAdapter from '../../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const CompanyRegisterForm = () => {
    let params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log('Request company register: ', values);
        const { companyName, rut, companyCode, email, username, password } = values;
        dispatch(setCompany({
            companyName,
            rut,
            companyCode,
            email,
            username,
            password,
        }));
        navigate(`${ROUTES.companyPlans}/${params.planId}/pago`);
    };

    return (
        <div className="company-register-container">
            <h3 className="company-register-header">Datos de la empresa</h3>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className="company-register-form">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    name="companyName"
                                    label="Razón social"
                                    autoComplete="companyName"
                                    component={TextFieldAdapter}
                                    fullWidth
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="rut"
                                    label="RUT"
                                    autoComplete="rut"
                                    component={TextFieldAdapter}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="companyCode"
                                    label="Código de empresa"
                                    autoComplete="companyCode"
                                    component={TextFieldAdapter}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="email"
                                    label="Email del administrador de la empresa"
                                    autoComplete="email"
                                    component={TextFieldAdapter}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="username"
                                    label="Username del administrador de la empresa"
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
                                    label="Contraseña del administrador de la empresa"
                                    autoComplete="new-password"
                                    component={TextFieldAdapter}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            className="company-register-form-button"
                            disabled={submitting}
                            fullWidth
                        >
                            Registrar mi empresa
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default CompanyRegisterForm;
