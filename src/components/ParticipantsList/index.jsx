import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './styles.scss';

const ParticipantsList = ({ participants }) => {
    const { user: userLogged } = useSelector((state) => state.session);

    return (
        <div className="participants-list">
            <TableContainer className="participants-table" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {participants.map((participant) => {
                            const {
                                score,
                                usuario: participantData,
                            } = participant;
                            const { userName, image } = participantData;
                            let styles = null;
                            if (userLogged.name === userName) {
                                styles = {
                                    color: '#54086F',
                                    fontWeight: 'bold',
                                };
                            }
                            return (
                                <TableRow
                                    key={userName}
                                    className="participants-table-row"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" style={styles}>
                                        <div className="participant-username">
                                            <Avatar alt={userName} src={image} />
                                            {userName}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right" style={styles}>
                                        {score}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ParticipantsList;
