import React from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './styles.scss';

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

const CompanyEmplyeeList = ({ employees }) => {

    return (
        <>
            <div className="pencas-list-header">
                <h2>Funcionarios</h2>
            </div>
            <div className="pencas-list">
                {employees.map((employee) => (
                    <StyledPaper
                        key={employee.id}
                        sx={{
                            my: 1,
                            mx: 'auto',
                            p: 2,
                        }}
                    >
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs>
                                <span className="penca-name">
                                    {employee.userName}
                                </span>
                                <br />
                                <div className="penca-footer">
                                    <span className="penca-betting-pool">
                                        <strong>Dirección de correo:</strong> {employee.email}
                                    </span>
                                    {/*handleJoinPenca && (
                                        <Button
                                            className="join-button"
                                            variant="contained"
                                            onClick={() => handleJoinPenca(penca.id)}
                                        >
                                            Unirme
                                        </Button>
                                    )*/}
                                </div>
                            </Grid>
                        </Grid>
                    </StyledPaper>
                ))}
            </div>
        </>
    );
};

export default CompanyEmplyeeList;
