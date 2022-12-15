import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';

import { getCompanyAdminRoutes } from '../../../utils/routes';
import './styles.scss';

const columns = [
    {
        id: 'image',
        label: 'Imagen',
        minWidth: 40,
        format: (image) => image
            ? <Avatar src={image} alt={image} />
            : <AccountCircleIcon fontSize="large" />
    },
    { id: 'userName', label: 'Username', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'habilitado', label: 'Habilitado', minWidth: 50, format: (enabled) => enabled ? 'Si' : 'No' },
    {
        id: 'actions',
        label: 'Acciones',
        minWidth: 100,
        format: (actions) => actions
            ? (
                <>
                    <Button
                        className="company-penca-users-table-row-enable-user"
                        onClick={actions.handleEnableUser}
                        variant="contained"
                    >
                        Habilitar
                    </Button>
                    <Button
                        className="company-penca-users-table-row-reject-user"
                        onClick={actions.handleRejectUser}
                        variant="contained"
                        color="error"
                    >
                        Rechazar
                    </Button>
                </>
            )
            : null
    },
];

const CompanyPencaUsersTable = ({ users, usersCounter, handleEnableUser, handleRejectUser }) => {
    let params = useParams();
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className="company-penca-users-table">
            <div className="company-penca-users-table-header">
                <div className="company-penca-users-table-info">
                    Invitaciones restantes: <strong>{usersCounter}</strong>
                </div>
                <div className="company-penca-users-table-actions">
                    <Button
                        key="company-penca-users-table-actions-invite-user"
                        className="company-penca-users-table-actions-invite-user"
                        onClick={() => navigate(`${getCompanyAdminRoutes(params.companyCode, params.pencaId).pencaUserInvite}`)}
                        disabled={usersCounter === 0}
                    >
                        Invitar usuario
                    </Button>
                </div>
            </div>
            <br />
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor: '#FBDEC7' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => {
                                const row = {
                                    ...user,
                                };
                                if (user.habilitado !== true) {
                                    row.actions = {
                                        handleEnableUser: () => handleEnableUser(user.id),
                                        handleRejectUser: () => handleRejectUser(user.id),
                                    };
                                }

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        className="company-penca-users-table-row"
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default CompanyPencaUsersTable;
