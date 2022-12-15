import React from 'react';
import { Form } from 'react-final-form';
import InputColor from 'react-input-color';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import AvatarUpload from '../../AvatarUpload';
import validate from './validate';
import './styles.scss';

const CompanyConfigurationForm = ({
    configuration,
    initialImage,
    onSubmit,
    feedbackMessage,
    setGeneralText,
    setGeneralBackground,
    setNavbarText,
    setNavbarBackground,
    setFiles,
}) => {

    return (
        <div className="company-configuration-form-container">
            <h2 className="company-configuration-form-header">Configurar la empresa</h2>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className="company-configuration-form">
                        <Grid container spacing={2} className="company-configuration-div">
                            <div style={{ width: '100%' }}>
                                <AvatarUpload
                                    initialImage={initialImage}
                                    setFiles={setFiles}
                                />
                            </div>

                            <h4 className="company-configuration-form-subtitle">General</h4>
                            <div className="company-configuration-form-item-container">
                                <div className="company-configuration-form-item">
                                    <div>
                                        Color de texto:
                                    </div>
                                    <div>
                                        <InputColor
                                            initialValue={configuration?.generalText ?? '#5e72e4'}
                                            onChange={setGeneralText}
                                            placement="right"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="company-configuration-form-item-container">
                                <div className="company-configuration-form-item">
                                    <div>
                                        Color de fondo:
                                    </div>
                                    <div>
                                        <InputColor
                                            initialValue={configuration?.generalBackground ?? '#5e72e4'}
                                            onChange={setGeneralBackground}
                                            placement="right"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h4 className="company-configuration-form-subtitle">Banner</h4>
                            <div className="company-configuration-form-item-container">
                                <div className="company-configuration-form-item">
                                    <div>
                                        Color de texto:
                                    </div>
                                    <div>
                                        <InputColor
                                            initialValue={configuration?.navbarText ?? '#5e72e4'}
                                            onChange={setNavbarText}
                                            placement="right"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="company-configuration-form-item-container">
                                <div className="company-configuration-form-item">
                                    <div>
                                        Color de fondo:
                                    </div>
                                    <div>
                                        <InputColor
                                            initialValue={configuration?.navbarBackground ?? '#5e72e4'}
                                            onChange={setNavbarBackground}
                                            placement="right"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        {feedbackMessage && (
                            <div className="company-configuration-form-feedback-message">
                                <br />
                                <Alert severity={feedbackMessage.type}>
                                    {feedbackMessage.message}
                                </Alert>
                            </div>
                        )}
                        <Button
                            type="button"
                            className="company-configuration-form-button"
                            onClick={onSubmit}
                            variant="contained"
                            disabled={submitting}
                            fullWidth
                        >
                            Guardar configuración
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default CompanyConfigurationForm;
