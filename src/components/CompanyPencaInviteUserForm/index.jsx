import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { inviteUser } from '../../services/employees';
import './styles.scss';

const theme = createTheme();

const CompanyPencaInviteUserForm = () => {
    let params = useParams();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            pencaId: params.pencaId,
            email: formData.get('email'),
        };
        inviteUser(data).then((response) => {
            console.log('Response invite user: ', response);
            setFeedbackMessage({
                type: 'success',
                message: 'Invitaciòn enviada con éxito.',
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
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
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Enviar invitación
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CompanyPencaInviteUserForm;
