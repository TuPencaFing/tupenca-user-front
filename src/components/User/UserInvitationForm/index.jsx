import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import logo from '../../../assets/logo.png';
import { acceptInvitation, rejectInvitation } from '../../../services/users';
import ROUTES from '../../../utils/routes';
import './styles.scss';

const theme = createTheme();

const UserInvitationForm = () => {
    const navigate = useNavigate();
    let params = useParams();
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleAccept = () => {
        const data = {
            accessToken: params.token,
        };
        acceptInvitation(data).then((response) => {
            console.log('Accept invitation response: ', response);
            navigate(ROUTES.misPencas);
        }).catch((error) => {
            console.log('Error accepting invitation: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al intentar aceptar la invitaciòn, inténtelo nuevamente.',
            });
        });
    };

    const handleReject = () => {
        const data = {
            accessToken: params.token,
        };
        rejectInvitation(data).then((response) => {
            console.log('Reject invitation response: ', response);
            navigate(ROUTES.misPencas);
        }).catch((error) => {
            console.log('Error rejecting invitation: ', error);
            setFeedbackMessage({
                type: 'error',
                message: 'Ocurrió un error al intentar rechazar la invitaciòn, inténtelo nuevamente.',
            });
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={logo}
                        alt="Tu Penca"
                        width="64px"
                        height="59px"
                    />
                    <Typography component="h1" variant="h5">
                        Se le ha invitado a participar de una penca de empresa. Qué desea hacer?
                    </Typography>
                    {feedbackMessage && (
                        <>
                            <br />
                            <Alert severity={feedbackMessage.type}>
                                {feedbackMessage.message}
                            </Alert>
                        </>
                    )}
                    <div className="user-invitation-actions">
                        <Button
                            type="submit"
                            variant="contained"
                            color="error"
                            className="user-invitation-reject"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleReject}
                        >
                            Rechazar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            className="user-invitation-accept"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleAccept}
                        >
                            Aceptar
                        </Button>
                    </div>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default UserInvitationForm;
