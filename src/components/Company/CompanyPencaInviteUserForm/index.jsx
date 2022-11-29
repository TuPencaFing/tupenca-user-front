import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { inviteUser } from '../../../services/employees';
import TextFieldAdapter from '../../TextFieldAdapter';
import validate from './validate';
import './styles.scss';

const theme = createTheme();

const CompanyPencaInviteUserForm = () => {
    let params = useParams();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const onSubmit = async (values) => {
        console.log('Request invite user: ', values);
        const data = {
            pencaId: params.pencaId,
            email: values.email,
        };
        inviteUser(data).then((response) => {
            console.log('Response invite user: ', response);
            setFeedbackMessage({
                type: 'success',
                message: 'Invitación enviada con éxito.',
            });
        }).catch((error) => {
            console.log('Error invite user: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al intentar invitar al usuario, inténtelo nuevamente.',
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
                    <Form
                        onSubmit={onSubmit}
                        validate={validate}
                        render={({ handleSubmit, submitting }) => (
                            <form onSubmit={handleSubmit} className="invite-user-form">
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
                                    className="send-invitation-button"
                                    variant="contained"
                                    disabled={submitting}
                                    fullWidth
                                >
                                    Enviar invitación
                                </Button>
                            </form>
                        )}
                    />
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CompanyPencaInviteUserForm;
