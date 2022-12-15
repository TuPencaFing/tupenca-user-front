import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
    { id: 'title', label: 'Título', minWidth: 100 },
    { id: 'description', label: 'Descripción', minWidth: 200 },
    { id: 'championshipName', label: 'Campeonato', minWidth: 100 },
];

const CompanyPencasTable = ({ pencas, pencasCounter, handleClickPenca }) => {
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
        <Paper className="company-pencas-table">
            <div className="company-pencas-table-header">
                <div className="company-pencas-table-info">
                    Pencas restantes: <strong>{pencasCounter}</strong>
                </div>
                <div className="company-pencas-table-actions">
                    <Button
                        key="company-pencas-table-actions-create-penca"
                        className="company-pencas-table-actions-create-penca"
                        onClick={() => navigate(`${getCompanyAdminRoutes(params.companyCode).pencasCreate}`)}
                        disabled={pencasCounter === 0}
                    >
                        Crear penca
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
                        {pencas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        className="company-pencas-table-row"
                                        onClick={() => handleClickPenca(row.id)}
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
                count={pencas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default CompanyPencasTable;
