import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './styles.scss';

const ParticipantsList = ({ participants }) => {
    const { user } = useSelector((state) => state.session);

    return (
        <div className="participants-list">
            <TableContainer className="participants-table" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {participants.map((participant) => {
                            let styles = null;
                            if (user.name === participant.userName) {
                                styles = {
                                    color: '#54086F',
                                    fontWeight: 'bold',
                                };
                            }
                            return (
                                <TableRow
                                    key={participant.id}
                                    className="participants-table-row"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" style={styles}>
                                        {participant.userName}
                                    </TableCell>
                                    <TableCell align="right" style={styles}>
                                        {participant.totalScore}
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
